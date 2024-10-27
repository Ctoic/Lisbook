from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Folder paths for file storage and includes
UPLOAD_FOLDER = 'uploads'
EXTRA_FILE_PATH = 'extrafile.txt'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set maximum upload size to 100 MB
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024 * 1024  # 1 GB

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    # Read content from extrafile.txt if it exists
    extra_data = ""
    try:
        with open(EXTRA_FILE_PATH, 'r') as file:
            extra_data = file.read()
    except FileNotFoundError:
        extra_data = "No extra file content found."
    
    # Render index.html with extra file content
    return render_template('index.html', extra_data=extra_data)

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if file is part of the POST request
    if 'file' not in request.files:
        flash('No file part in the request')
        return redirect(request.url)

    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    
    # Save the file if it is allowed
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('File successfully uploaded')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
