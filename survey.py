from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from datetime import datetime
from sqlalchemy import text
import psycopg2
import os
import json
# from markupsafe import escape

db = SQLAlchemy()

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    q1 = db.Column(db.String(50))
    q2 = db.Column(db.String(50))
    q3 = db.Column(db.String(50))
    q4 = db.Column(db.String(100))
    q5 = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# #Template
# user = User(
#         id = 2 ,
#         username = "hello"
# )

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db.init_app(app)

@app.route('/')
def hello():
    db.create_all()
    return render_template('root copy.html')

@app.route('/decline')
def decline():
    return render_template('decline copy.html')

@app.route("/thanks", methods=["POST"])
def thanks():
    # db.create_all()
    # db.session.add(user)
    # db.session.commit()
    # user2 = db.session.execute(db.select(User))
    # for each in user2.scalars():
    #     print(each.id)

    # Fetch data
    q1 = request.form["q1"]
    q2 = request.form["q2"]
    q3 = request.form["q3"]
    q4_list = request.form.getlist("q4[]")
    q5 = request.form["q5"]

    #test
    print(f'1:{q1}')
    print(f'2:{q2}')
    print(f'3:{q3}')
    print(f'4:{q4_list}')
    print(f'5:{q5}')

    #Change the list into Json
    q4 = json.dumps(q4_list)
    # print(f'4{q4}')

    #Store data into database
    survey = Survey(
        q1 = q1,
        q2 = q2,
        q3 = q3,
        q4 = q4,
        q5 = q5
    )
    db.session.add(survey)
    db.session.commit()
    return render_template('thanks copy.html')

@app.route('/survey')
def survey():
    return render_template('survey copy.html')

@app.route('/api/results', methods=["GET"])
def get_result():

    # Fetch the query parameter
    setting = request.args.get('reverse','')
    if setting == "true" :
        sql='SELECT * FROM Survey ORDER BY created_at DESC'
    else:
        sql='SELECT * FROM Survey'
    # print(setting)
    
    # Get the data from database
    result = db.session.execute(text(sql))
    new_result=[]
    for row in result:
        new={}
        new["id"]=row[0]
        new["q1"]=row[1]
        new["q2"]=row[2]
        new["q3"]=row[3]
        new["q4"]=row[4]
        new["q5"]=row[5]
        new["created_at"]=row[6]
        new_result.append(new)
    return jsonify(new_result)

@app.route('/admin/summary')
def get_summary():
    result = db.session.execute(text('SELECT * FROM Survey'))
    data=[]
    for row in result:
        new={}
        new["id"]=row[0]
        new["q1"]=row[1]
        new["q2"]=row[2]
        new["q3"]=row[3]
        new["q4"]=json.loads(row[4])
        new["q5"]=row[5]

        # parse only date, month, year from string
        new["date"]=f'{row[6].day} {row[6].month} {row[6].year}'
        data.append(new)
    return render_template('summary copy.html', data=data)


