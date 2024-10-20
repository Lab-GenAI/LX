from flask import Flask, render_template, request, jsonify, url_for
import json
import string
import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
api_key = "0JaOOdjO9mWgc1N38EClqBKYZdS46t7o"
client = ChatCompletionsClient(
    endpoint='https://Llama-3-2-90B-Vision-Instruct-tz.eastus.models.ai.azure.com',
    credential=AzureKeyCredential(api_key)
)

GIF_FOLDER = 'static/ISL_Gifs/'

isl_gif=['any questions', 'are you angry', 'are you busy', 'are you hungry', 'are you sick', 'be careful',
                'can we meet tomorrow', 'did you book tickets', 'did you finish homework', 'do you go to office', 'do you have money',
                'do you want something to drink', 'do you want tea or coffee', 'do you watch TV', 'dont worry', 'flower is beautiful',
                'good afternoon', 'good evening', 'good morning', 'good night', 'good question', 'had your lunch', 'happy journey',
                'hello what is your name', 'how many people are there in your family', 'i am a clerk', 'i am bore doing nothing', 
                 'i am fine', 'i am sorry', 'i am thinking', 'i am tired', 'i dont understand anything', 'i go to a theatre', 'i love to shop',
                'i had to say something but i forgot', 'i have headache', 'i like pink colour', 'i live in nagpur', 'lets go for lunch', 'my mother is a homemaker',
                'my name is john', 'nice to meet you', 'no smoking please', 'open the door', 'please call me later',
                'please clean the room', 'please give me your pen', 'please use dustbin dont throw garbage', 'please wait for sometime', 'shall I help you',
                'shall we go together tommorow', 'sign language interpreter', 'sit down', 'stand up', 'take care', 'there was traffic jam', 'wait I am thinking',
                'what are you doing', 'what is the problem', 'what is todays date', 'what is your father do', 'what is your job',
                'what is your mobile number', 'what is your name', 'whats up', 'when is your interview', 'when we will go', 'where do you stay',
                'where is the bathroom', 'where is the police station', 'you are wrong','address','agra','ahemdabad', 'all', 'april', 'assam', 'august', 'australia', 'badoda', 'banana', 'banaras', 'banglore',
'bihar','bihar','bridge','cat', 'chandigarh', 'chennai', 'christmas', 'church', 'clinic', 'coconut', 'crocodile','dasara',
'deaf', 'december', 'deer', 'delhi', 'dollar', 'duck', 'febuary', 'friday', 'fruits', 'glass', 'grapes', 'gujrat', 'hello',
'hindu', 'hyderabad', 'india', 'january', 'jesus', 'job', 'july', 'july', 'karnataka', 'kerala', 'krishna', 'litre', 'mango',
'may', 'mile', 'monday', 'mumbai', 'museum', 'muslim', 'nagpur', 'october', 'orange', 'pakistan', 'pass', 'police station',
'post office', 'pune', 'punjab', 'rajasthan', 'ram', 'restaurant', 'saturday', 'september', 'shop', 'sleep', 'southafrica',
'story', 'sunday', 'tamil nadu', 'temperature', 'temple', 'thursday', 'toilet', 'tomato', 'town', 'tuesday', 'usa', 'village',
'voice', 'wednesday', 'weight','please wait for sometime','what is your mobile number','what are you doing','are you busy']

arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z']

lexing_mapping  = '''Analyze the English text to perform lexical mapping:

Word Association: Identify and list all key words and phrases in the text.
Context Understanding: Determine how these words relate to each other within the context.
Tone Analysis: Assess the emotional tone (e.g., neutral, happy, urgent) and style of the text.
Intent Recognition: Identify the intent behind the text (e.g., question, statement, command).
Database Retrieval: Retrieve relevant background information or definitions from knowledge bases to enhance understanding.

Instructions:

Provide a list of key words/phrases with their associated concepts.
Explain the relationships between words for context understanding.
Describe the detected tone and intent.
Include any additional information retrieved from databases.

Example Output:-
Analysis:

Word Association:
"Could you": Polite request initiation.
"Please": Politeness marker.
"Pass": Transfer action.
"Salt": Object (condiment).
Context Understanding:
The speaker is making a polite request for someone to hand over the salt.
Tone Analysis:
Polite, courteous.
Intent Recognition:
Request for action.
Database Retrieval:
Cultural norm of politeness in requests

'''

context_memory = '''
Using the results from lexical mapping, update and maintain context memory:

Dynamic Updates: Continuously integrate new information as it's processed.
Contextual Tracking: Keep track of how words and phrases relate throughout the text.
Memory Retention: Store significant details from earlier in the text that influence current interpretation.
Long-Term Knowledge: Apply relevant general world knowledge to enhance comprehension.
Short-Term Context: Focus on immediate context to resolve ambiguities.

Instructions:

Summarize the evolving context.
Highlight any shifts in tone or intent.
Note any long-term knowledge applied.
Detail how short-term context affects current understanding.

Example Output:-
Context Memory Update:
Dynamic Updates:
Recognize the ongoing polite interaction.
Contextual Tracking:
No prior context affecting this request.
Memory Retention:
Remember the use of polite forms for future interactions.
Long-Term Knowledge:
Understanding that "please" signifies politeness.
Short-Term Context:
Focus on the immediate request

I have added below the output of my lexical mapping and the initial user input:

'''

semantic_search = '''
Perform a semantic search to find appropriate ASL signs:

Meaning Analysis: Interpret the underlying meanings of key words/phrases within context.
Vector Embeddings: Utilize semantic embeddings to represent meanings numerically for comparison.
Intent Focus: Prioritize meanings that align with the identified intent.
Relevance Matching: Match concepts to ASL signs that best convey the intended meaning.
Contextual Retrieval: Access additional context or disambiguate meanings as needed.

Instructions:
Provide a list of potential ASL signs for each concept.
Explain how each sign matches the intended meaning and context.
Address any ambiguities or multiple meanings.
Exclude any irrelevant options due to cryptographic failures or data issues."

Example Output:-
Meaning Analysis:
The speaker wants someone to give them the salt.
Potential ASL Signs:
"YOU" + "GIVE-ME" + "SALT" + "PLEASE"
Relevance Matching:
These signs convey the request appropriately in ASL.
Ambiguities Addressed:
"Pass" in English equates to "give" in ASL.

I have added below the output of my context memory and the initial user input:
'''

fitment_transformation = '''
Generate the final visual representation of the ASL translation:

Rendering & Animation: Create animations or visual models of the sign sequence.
Quality Assurance: Verify that signs are accurate and expressions convey the correct emotions.
Accessibility: Ensure the output is clear and understandable for ASL users.

Instructions:

Produce a visual or animated output of the sign sequence.
Check for smoothness and clarity in sign transitions.
Confirm that the intended message is effectively communicated.

Example Output:-
Fitment & Transform Sequence:
Sequence Adjustment:
ASL Grammar: "PLEASE" + "YOU" + "GIVE-ME" + "SALT"
Movement Transformation:
Smooth motion from "YOU" to "GIVE-ME"
Expression Integration:
Facial expression showing a polite request (raised eyebrows, slight head tilt)

I have added below the output of my semantic search and the initial user input:
'''


app = Flask(__name__)

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/')
def starter():
    return render_template('starter.html')

@app.route('/demo')
def demo():
    return render_template('demo.html')

@app.route('/layer_playground')
def layer_playground():
    return render_template('layer_playground.html')


@app.route('/check_input_layer_mp', methods=['POST'])
def check_input_layer_mp():
    input_text = request.json['inputText']
    return prompt_based_func(input_text,lexing_mapping,0)

@app.route('/check_data_layer_mp', methods=['POST'])
def check_data_layer_mp():
    input_text = request.json['inputText']
    return prompt_based_func(input_text,context_memory,0)

@app.route('/check_connected_layer_mp', methods=['POST'])
def check_connected_layer_mp():
    input_text = request.json['inputText']
    return prompt_based_func(input_text,semantic_search,0)

@app.route('/check_pii_layer_mp', methods=['POST'])
def check_pii_layer_mp():
    input_text = request.json['inputText']
    return prompt_based_func(input_text,fitment_transformation,0)

def prompt_based_func(input_text,prompt,temp):
    payload = {
                "messages":[
                        SystemMessage(content=prompt),
                        UserMessage(content=input_text),
                    ],
                "max_tokens": 4096,
                "temperature": 0,
                "top_p": 0.1,
                "presence_penalty": 0,
                
                }
    response = client.complete(payload)
    return json.dumps(response.choices[0].message.content)

@app.route('/get_gif', methods=['POST'])
def get_gif():
    input_text = request.json.get('inputText', '').lower()  # Get the input text and make it lowercase
    
    # Remove punctuation from input
    input_text = ''.join(c for c in input_text if c not in string.punctuation)
    
    print(f"Received input: {input_text}")

    # Map the input text to a GIF file (e.g., "good morning" -> "good_morning.gif")
    gif_filename = input_text+".gif"
    
    # Construct the full path to the GIF file
    gif_path = os.path.join(GIF_FOLDER, gif_filename)
    
    # Check if the GIF exists
    if os.path.exists(gif_path):
        gif_url = url_for('static', filename=f"ISL_Gifs/{gif_filename}")
        return jsonify({"gif_url": gif_url})
    else:
        return jsonify({"error": "GIF not found"}), 404

if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0',port=8080,use_reloader = False)

