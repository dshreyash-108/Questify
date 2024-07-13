from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi

def get_video_summary(youtube_video):
    video_id = youtube_video.split("=")[1]

    transcript = YouTubeTranscriptApi.get_transcript(video_id)

    result = ""
    for i in transcript:
        result += ' ' + i['text']

    # Explicitly specify the model and revision
    summarizer = pipeline('summarization', model='sshleifer/distilbart-cnn-12-6', revision='a4f8f3e')

    num_iters = int(len(result) / 1000)
    summarized_text = []
    
    for i in range(num_iters + 1):
        start = i * 1000
        end = (i + 1) * 1000
        input_text = result[start:end]
        
        # Specify max_length based on your requirements
        summary = summarizer(input_text, max_length=100)
        summary = summary[0]['summary_text']
        
        summarized_text.append(summary)

    return summarized_text

# # Example usage:
# youtube_video = "https://www.youtube.com/watch?v=s2skans2dP4"
# result = get_video_summary(youtube_video)
# print(result)


