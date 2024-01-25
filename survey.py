from flask import Flask, request, render_template
# from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def hello():
    return "<p>hello</p>"

@app.route('/daqing')
def hello2():
    return "<p>hello daqing</p>"