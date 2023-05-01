import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer


def set_seed(seed):
  torch.manual_seed(seed)
  if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)

set_seed(42)

model = T5ForConditionalGeneration.from_pretrained('ramsrigouthamg/t5_paraphraser')
tokenizer = T5Tokenizer.from_pretrained('ramsrigouthamg/t5_paraphraser')

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print ("device ",device)
model = model.to(device)



sentences = ["But Mr Putin said the plan could be put forward only when they are ready for it in the West and in Kyiv.",
      "Chinas plan, published last month, does not explicitly call for Russia to leave Ukraine.",
      "It calls for peace talks and respect for national sovereignty, without specific proposals.",
      "But Ukraine has insisted on Russia withdrawing from its territory as a condition for any talks - and there is no sign that Russia is ready to do that.",
      "In a joint news conference after talks with Mr Xi ended, Mr Putin said: 'Many provisions of the Chinese peace plan can be taken as the basis for settling of the conflict in Ukraine, whenever the West and Kyiv are ready for it.'",
      "But Russia had yet to see such 'readiness' from the other side, he added.",
      "Standing alongside the Russian leader, Mr Xi said his government was in favour of peace and dialogue and that China was on the 'right side of history'."]


for sentence in sentences:  
    text =  "paraphrase: " + sentence + " </s>"

    max_len = 256

    encoding = tokenizer.encode_plus(text,pad_to_max_length=True, return_tensors="pt")
    input_ids, attention_masks = encoding["input_ids"].to(device), encoding["attention_mask"].to(device)


    # set top_k = 50 and set top_p = 0.95 and num_return_sequences = 3
    beam_outputs = model.generate(
        input_ids=input_ids, attention_mask=attention_masks,
        do_sample=True,
        max_length=256,
        top_k=120,
        top_p=0.98,
        early_stopping=True,
        num_return_sequences=1
    )


    print ("\nOriginal Question ::")
    print (sentence)
    print ("\n")
    print ("Paraphrased Questions :: ")
    final_outputs =[]
    for beam_output in beam_outputs:
        sent = tokenizer.decode(beam_output, skip_special_tokens=True,clean_up_tokenization_spaces=True)
        if sent.lower() != sentence.lower() and sent not in final_outputs:
            final_outputs.append(sent)

    for i, final_output in enumerate(final_outputs):
        print("{}: {}".format(i, final_output))
