from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

input_text = 'rewrite the following text as a formal article:\n\n A prolonged heatwave in the US has led to an uptick in severely burned patients who were injured after touching hot surfaces or objects.  Medics in Arizona said some patients were hurt after falling onto asphalt which had been heated by the sun.  The city of Phoenix has now seen a record-breaking 24 consecutive days of temperatures above 110F (43C).  Officials warn that ground temperatures can reach near-boiling, and warn people to seek shelter from the fiery heat.  Dr Kevin Foster of the Arizona Burn Centre tells BBC News that all of the centre\'s 45 hospital beds are currently occupied, and around one-third of those patients have suffered severe contact burns from scorching concrete and asphalt surfaces.  "Summertime is the busy time, so that\'s not surprising, but the numbers are a little bit higher than anticipated," he says, adding that the rate of new patients has outpaced 2022 so far this summer.  Many of the patients are elderly people, who may have fallen after becoming unsteady in the heat, or children who do not get off the ground quickly after falling.  However, he says the "biggest problem" is drug users who are often dehydrated and can faint on sidewalks.  "When people go down to a hot surface and stay there, it only takes 10 to 15 minutes to suffer heat exhaustion, burns and other problems," says Dr Foster, adding that some of the burns are deep, third-degree injuries that will require skin grafts.  The centre is also treating over 150 patients who have not been admitted to hospital, but need to be treated for burns sustained touching hot surfaces, such as metal car seat belts.  The inside of a car or the dark asphalt surface of a road can be far hotter than the air temperature, research has shown. Touching metal or asphalt for only a few seconds can be enough to cause severe burns.'
input_ids = tokenizer(input_text, return_tensors="pt").input_ids

outputs = model.generate(input_ids, 
                         min_length=300,
                         max_length=5000,
                         length_penalty=2,
                         num_beams=2,
                         no_repeat_ngram_size=2)
print(tokenizer.decode(outputs[0]))