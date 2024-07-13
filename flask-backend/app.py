from flask import Flask, request, jsonify
from model import get_video_summary
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def translate_to_hindi(text_list):
    translator = Translator()
    try:
        # Concatenate the list of summarized text chunks into a single string
        summary_text = ' '.join(text_list)
        
        # Translate the summarized text to Hindi
        translated_text = translator.translate(summary_text, src='en', dest='hi').text
        return translated_text
    except Exception as e:
        print(f"Error translating to Hindi: {e}")
        return "Translation failed"

@app.route('/')
def home():
    return "Hello world"

@app.route('/summarize', methods=['GET'])
def summarize():
    youtube_video = request.args.get('youtube_video', default=None)

    if youtube_video:
        result = get_video_summary(youtube_video)
        
        # Pass the list of summarized text chunks to the translation function
        translated_result = translate_to_hindi(result)
        response_data = {
            'summarized_text': result,
            'translated_text': translated_result
        }

        # Add CORS headers for this route
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'error': 'Please provide a YouTube video URL as a query parameter.'})

if __name__ == '__main__':
    app.run(debug=True)
