from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

device = "cpu"

tokenizer = AutoTokenizer.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base")

model = AutoModelForSeq2SeqLM.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base").to(device)

def paraphrase(
    question,
    num_beams=5,
    num_beam_groups=5,
    num_return_sequences=1,
    repetition_penalty=10.0,
    diversity_penalty=3.0,
    no_repeat_ngram_size=2,
    temperature=0.7,
    max_length=128
):
    input_ids = tokenizer(
        f'paraphrase: {question}',
        return_tensors="pt", padding="longest",
        max_length=max_length,
        truncation=True,
    ).input_ids
    
    outputs = model.generate(
        input_ids, temperature=temperature, repetition_penalty=repetition_penalty,
        num_return_sequences=num_return_sequences, no_repeat_ngram_size=no_repeat_ngram_size,
        num_beams=num_beams, num_beam_groups=num_beam_groups,
        max_length=max_length, diversity_penalty=diversity_penalty
    )

    res = tokenizer.batch_decode(outputs, skip_special_tokens=True)

    return res

text = '''But Mr Putin said the plan could be put forward only "when they are ready for it in the West and in Kyiv". The Russian leader met Chinese President Xi Jinping on Tuesday in Moscow to discuss the conflict, and relations between the two countries.China's plan, published last month, does not explicitly call for Russia to leave Ukraine.Listing , it calls for peace talks and respect for national sovereignty, without specific proposals.But Ukraine has insisted on Russia withdrawing from its territory as a condition for any talks - and there is no sign that Russia is ready to do that.The US Secretary of State Antony Blinken said on 
Monday that calling for a ceasefire before Russia withdrew "would effectively be supporting the ratification of Russian conquest".In a joint news conference after talks with Mr Xi ended, Mr Putin said: "Many provisions of the Chinese peace plan can be taken as the basis for settling of the conflict in Ukraine, whenever the West and Kyiv are ready for it."But Russia had yet to see such "readiness" from the other side, he added.Standing alongside the Russian leader, Mr Xi said his government was in favour of peace and dialogue and that China was on the "right side of history". He again claimed that China had an "impartial position" on the conflict in Ukraine, seeking to cast Beijing as the potential peace-maker. The pair also discussed growing trade, energy and political ties between the two nations. "China is the leading foreign trade partner of Russia," President Putin said, pledging to keep up and surpass the "high level" of trade achieved last year. According to Russian state media, the two leaders also."'''

print(paraphrase(text))

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

phrasesMerged = ""

for phrase in phrases:
    phrasesMerged = phrasesMerged + phrase

# print(phrasesMerged)
# print(paraphrase(phrasesMerged))
# for phrase in phrases:
#     a = paraphrase(phrase)
#     paraphrase.append(a[0])

# for sentence in paraphrase:
#     print(sentence)
