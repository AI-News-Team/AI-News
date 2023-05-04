import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
model_name = 'tuner007/pegasus_paraphrase'
torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

def get_response(input_text,num_return_sequences,num_beams):
  batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
  translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
  tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
  return tgt_text


num_beams = 1
num_return_sequences = 1
context = "I will be showing you how to build a web application in Python using the SweetViz and its dependent library. Data science combines multiple fields, including statistics, scientific methods, artificial intelligence (AI), and data analysis, to extract value from data. Those who practice data science are called data scientists, and they combine a range of skills to analyze data collected from the web, smartphones, customers, sensors, and other sources to derive actionable insights."
# print(get_response(context,num_return_sequences,num_beams))

phrases = [
      "But Mr Putin said the plan could be put forward only \"when they are ready for it in the West and in Kyiv\". ",
      "The Russian leader met Chinese President Xi Jinping on Tuesday in Moscow to discuss the conflict, and relations between the two countries.",
      "China's plan, published last month, does not explicitly call for Russia to leave Ukraine.",
      "Listing ",
      ", it calls for peace talks and respect for national sovereignty, without specific proposals.",
      "But Ukraine has insisted on Russia withdrawing from its territory as a condition for any talks - and there is no sign that Russia is ready to do that.",
      "The US Secretary of State Antony Blinken said on Monday that calling for a ceasefire before Russia withdrew \"would effectively be supporting the ratification of Russian conquest\".",
      "In a joint news conference after talks with Mr Xi ended, Mr Putin said: \"Many provisions of the Chinese peace plan can be taken as the basis for settling of the conflict in Ukraine, whenever the West and Kyiv are ready for it.\"",
      "But Russia had yet to see such \"readiness\" from the other side, he added.",
      "Standing alongside the Russian leader, Mr Xi said his government was in favour of peace and dialogue and that China was on the \"right side of history\". ",
      "He again claimed that China had an \"impartial position\" on the conflict in Ukraine, seeking to cast Beijing as the potential peace-maker. ",
      "The pair also discussed growing trade, energy and political ties between the two nations. ",
      "\"China is the leading foreign trade partner of Russia,\" President Putin said, pledging to keep up and surpass the \"high level\" of trade achieved last year. ",
      "According to Russian state media, the two leaders also:"
    ]

paraphrase = [""]

for phrase in phrases:
    a = get_response(phrase,num_return_sequences,num_beams)
    paraphrase.append(a[0])

for sentence in paraphrase:
    print(sentence)

# # output:
# ['The test of your knowledge is your ability to convey it.',
#  'The ability to convey your knowledge is the ultimate test of your knowledge.',
#  'The ability to convey your knowledge is the most important test of your knowledge.',
#  'Your capacity to convey your knowledge is the ultimate test of it.',
#  'The test of your knowledge is your ability to communicate it.',
#  'Your capacity to convey your knowledge is the ultimate test of your knowledge.',
#  'Your capacity to convey your knowledge to another is the ultimate test of your knowledge.',
#  'Your capacity to convey your knowledge is the most important test of your knowledge.',
#  'The test of your knowledge is how well you can convey it.',
#  'Your capacity to convey your knowledge is the ultimate test.']
