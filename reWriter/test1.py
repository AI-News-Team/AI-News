

from parrot import Parrot
import torch
import warnings
warnings.filterwarnings("ignore")

''' 
uncomment to get reproducable paraphrase generations
def random_state(seed):
  torch.manual_seed(seed)
  if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)

random_state(1234)
'''

#Init models (make sure you init ONLY once if you integrate this to your code)
parrot = Parrot(model_tag="prithivida/parrot_paraphraser_on_T5", use_gpu=False)

phrases = [
      "But Mr Putin said the plan could be put forward only when they are ready for it in the West and in Kyiv.",
      "Chinas plan, published last month, does not explicitly call for Russia to leave Ukraine.",
      "It calls for peace talks and respect for national sovereignty, without specific proposals.",
      "But Ukraine has insisted on Russia withdrawing from its territory as a condition for any talks - and there is no sign that Russia is ready to do that.",
      "In a joint news conference after talks with Mr Xi ended, Mr Putin said: 'Many provisions of the Chinese peace plan can be taken as the basis for settling of the conflict in Ukraine, whenever the West and Kyiv are ready for it.'",
      "But Russia had yet to see such 'readiness' from the other side, he added.",
      "Standing alongside the Russian leader, Mr Xi said his government was in favour of peace and dialogue and that China was on the 'right side of history'."
]

# print(" ".join(phrases))

# para_phrases = parrot.augment(input_phrase=" ".join(phrases), max_return_phrases = 1, adequacy_threshold = 0.5, fluency_threshold = 0.90)

# print(para_phrases)

for phrase in phrases:
  print("-"*100)
  print("Input_phrase: ", phrase)
  print("-"*100)
  para_phrases = parrot.augment(input_phrase=phrase, max_return_phrases = 2, adequacy_threshold = 0.9, fluency_threshold = 0.9)
  # print(para_phrases)
  for para_phrase in para_phrases:
   print(para_phrase)
