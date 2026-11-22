// FarhangGram v2.17.0 — Audited 6-Grade Curriculum (31 Lessons, Core Items + Exam Transformations + onboarding questions; Phase 3 distractor audit + formal written norm, three layers)
// Built on Larsen-Freeman's 3D Grammaring, Guided Discovery (Tell Your Teacher), & Quill Sentence Combining
// Fully offline · no network calls · RTL Persian UI with LTR isolation for English
window.GRAMMAR_CURRICULUM = {
  "prospect_1": {
    "id": "prospect_1",
    "name": "Prospect 1",
    "titleFa": "پایه هفتم",
    "modeBadgeFa": "الگوهای جمله‌سازی و مکالمه (Patterns & Functions)",
    "lessonsCount": 8,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: My Name",
        "titleFa": "درس ۱: معرفی خود و احوال‌پرسی (am / is / are)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای معرفی نام خود از «My name is ...» یا «I am ...» و برای پرسیدن نام مخاطب از «What is your name?» استفاده می‌کنیم.",
        "formulas": [
          {
            "label": "معرفی (+)",
            "chips": [
              {
                "role": "subj",
                "text": "My name"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "obj",
                "text": "Ali."
              }
            ],
            "exampleEn": "My name is Ali.",
            "exampleFa": "نام من علی است.",
            "learnerGlossFa": "نام من علی است."
          },
          {
            "label": "پرسش نام (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "subj",
                "text": "your name?"
              }
            ],
            "exampleEn": "What's your last name?",
            "exampleFa": "نام خانوادگی شما چیست؟",
            "learnerGlossFa": "نام شما چیست؟"
          },
          {
            "label": "احوال‌پرسی (?)",
            "chips": [
              {
                "role": "sig",
                "text": "How"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "subj",
                "text": "you?"
              }
            ],
            "exampleEn": "How are you today? — Fine, thanks.",
            "exampleFa": "امروز چطوری؟ — خوبم، ممنون.",
            "learnerGlossFa": "حال شما چطور است؟"
          }
        ],
        "signals": [
          "My name",
          "your name",
          "first name",
          "last name",
          "How are you"
        ],
        "traps": [
          {
            "wrong": "My name am Reza.",
            "right": "My name is Reza.",
            "noteFa": "فاعل «My name» سوم‌شخص مفرد است و «is» می‌گیرد، نه «am»."
          },
          {
            "wrong": "How is you?",
            "right": "How are you?",
            "noteFa": "در زمان حال، فعل بودن با ضمیر «you» به شکل «are» می‌آید."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "الگوی ارتباطی سلام، معرفی نام و احوال‌پرسی در برخورد اول",
        "contextDialogue": {
          "lineA": "Hello! My name is Amir. What is your name?",
          "faA": "سلام! نام من امیر است. نام شما چیست؟",
          "lineB": "Hi Amir! I am Sina. Nice to meet you.",
          "faB": "سلام امیر! من سینا هستم. از دیدنت خوشبختم."
        },
        "guidedDiscovery": {
          "questionFa": "در گفت‌وگوی بالا، چرا بعد از «My name» واژه «is» آمده اما بعد از «I» واژه «am»؟",
          "options": [
            "چون My name سوم‌شخص مفرد (آن نام) است و I اول‌شخص مفرد",
            "هر دو کاملاً قابل جایگزینی با یکدیگر هستند",
            "چون جمله اول سؤالی است"
          ],
          "correctIdx": 0,
          "insightFa": "در زمان حال، «My name» سوم‌شخص مفرد است و «is» می‌گیرد؛ با ضمیر «I» از «am» استفاده می‌کنیم."
        },
        "threeD": {
          "formFa": "I am + نام | My name is + نام | What is your name?",
          "meaningFa": "بیان هویت فردی، نام کوچک و نام خانوادگی و جویا شدن حال مخاطب",
          "useFa": "در آغاز مکالمات روزمره، کلاس درس و فرم‌های ثبت‌نام (رویکرد ارتباطی بدون اصطلاحات پیچیده)"
        },
        "learnerGuide": {
          "explainFa": "برای گفتن نام خود می‌توانی از دو الگو استفاده کنی: بعد از I، فعل am می‌آید؛ بعد از My name، فعل is می‌آید. برای پرسیدن نام مخاطب از What is your name استفاده می‌کنیم. نام شخص را در پاسخ می‌آوریم.",
          "examples": [
            {
              "en": "My name is Ali.",
              "fa": "نام من علی است."
            },
            {
              "en": "What is your name?",
              "fa": "نام شما چیست؟"
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: My Classmates",
        "titleFa": "درس ۲: معرفی هم‌کلاسی‌ها (He / She • this / that)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای پرسش درباره افراد از «Who is that boy/girl?» و در پاسخ برای مذکر از «He is / his» و برای مؤنث از «She is / her» بهره می‌گیریم.",
        "formulas": [
          {
            "label": "پرسش فرد (?)",
            "chips": [
              {
                "role": "sig",
                "text": "Who"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "obj",
                "text": "that boy?"
              }
            ],
            "exampleEn": "Who is that girl?",
            "exampleFa": "آن دختر کیست؟",
            "learnerGlossFa": "آن پسر کیست؟"
          },
          {
            "label": "معرفی دوست (+)",
            "chips": [
              {
                "role": "subj",
                "text": "He / She"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "obj",
                "text": "my classmate."
              }
            ],
            "exampleEn": "She is my friend, Zahra.",
            "exampleFa": "او دوستم زهرا است.",
            "learnerGlossFa": "او هم‌کلاسی من است."
          }
        ],
        "signals": [
          "Who is",
          "this",
          "that",
          "He / his",
          "She / her"
        ],
        "traps": [
          {
            "wrong": "Who are that boy?",
            "right": "Who is that boy?",
            "noteFa": "«that boy» مفرد است؛ بنابراین فعل «is» صحیح است."
          },
          {
            "wrong": "She is my brother.",
            "right": "He is my brother.",
            "noteFa": "برای «brother» (مذکر) ضمیر «He» به کار می‌رود."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "تفکیک اشاره به نزدیک/دور (this/that) و ضمایر مذکر و مؤنث",
        "contextDialogue": {
          "lineA": "Who is that girl near the whiteboard?",
          "faA": "آن دختر کنار تخته سفید کیست؟",
          "lineB": "She is my classmate, Zahra. Her bag is pink.",
          "faB": "او هم‌کلاسی من زهراست. کیفش صورتی است."
        },
        "guidedDiscovery": {
          "questionFa": "تفاوت نقش «She» و «Her» در پاسخ بالا چیست؟",
          "options": [
            "She ابتدای جمله (فاعل) می‌آید، اما Her قبل از اسم (bag) مالکیت را نشان می‌دهد",
            "She برای مذکر است و Her برای مؤنث",
            "هر دو معنی «کیف» می‌دهند"
          ],
          "correctIdx": 0,
          "insightFa": "دقیقاً! «He / She» ضمیر فاعلی هستند، اما «his / her» صفت ملکی‌اند و حتماً قبل از یک اسم می‌آیند."
        },
        "threeD": {
          "formFa": "Who is this/that ...? → He/She is ... | his/her + Noun",
          "meaningFa": "شناسایی افراد حاضر در محیط و نسبت دادن اشیا به آن‌ها",
          "useFa": "معرفی دوستان و هم‌کلاسی‌ها در مدرسه با رعایت جنسیت دستوری در ضمایر انگلیسی"
        },
        "learnerGuide": {
          "explainFa": "برای پرسیدن اینکه یک نفر کیست، جمله را با Who is شروع کن. در معرفی یک فرد پسر یا مرد، he و برای دختر یا زن، she به کار می‌رود؛ بعد از هر دو is می‌آید. This معمولاً به فرد یا چیز نزدیک و that به دورتر اشاره می‌کند.",
          "examples": [
            {
              "en": "Who is that girl?",
              "fa": "آن دختر کیست؟"
            },
            {
              "en": "She is my friend.",
              "fa": "او دوست من است."
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: My Age",
        "titleFa": "درس ۳: بیان سن و ماه تولد (How old • in + Month)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "سن را با فعل «am / is / are» (نه have!) بیان می‌کنیم و قبل از نام ماه‌های سال حرف اضافه «in» می‌آوریم.",
        "formulas": [
          {
            "label": "پرسش سن (?)",
            "chips": [
              {
                "role": "sig",
                "text": "How old"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "subj",
                "text": "you?"
              }
            ],
            "exampleEn": "I am thirteen years old.",
            "exampleFa": "من سیزده ساله هستم.",
            "learnerGlossFa": "چند سال داری؟"
          },
          {
            "label": "ماه تولد (+)",
            "chips": [
              {
                "role": "subj",
                "text": "My birthday"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "sig",
                "text": "in"
              },
              {
                "role": "obj",
                "text": "Mehr."
              }
            ],
            "exampleEn": "When is your birthday? — It's in Bahman.",
            "exampleFa": "تولدت کی است؟ — در بهمن است.",
            "learnerGlossFa": "تولد من در ماه مهر است."
          }
        ],
        "signals": [
          "How old",
          "years old",
          "When",
          "birthday",
          "in Mehr / in May"
        ],
        "traps": [
          {
            "wrong": "I have twelve years old.",
            "right": "I am twelve years old.",
            "noteFa": "در انگلیسی برای بیان سن از «am/is/are» استفاده می‌شود، نه «have»!"
          },
          {
            "wrong": "It's on Ordibehesht.",
            "right": "It's in Ordibehesht.",
            "noteFa": "قبل از نام ماه‌ها حرف اضافه «in» می‌آید."
          }
        ],
        "timelineType": "scale_compare",
        "timelineCaptionFa": "بیان سن با افعال بودن (am/is/are) و ماه تولد با حرف اضافه in",
        "contextDialogue": {
          "lineA": "How old are you, Nima? And when is your birthday?",
          "faA": "چند سال داری نیما؟ و تولدت چه زمانی است؟",
          "lineB": "I am thirteen years old. My birthday is in Bahman.",
          "faB": "من سیزده سال دارم. تولدم در ماه بهمن است."
        },
        "guidedDiscovery": {
          "questionFa": "در زبان فارسی می‌گوییم «سیزده سال دارم»، اما در انگلیسی نیما از چه فعلی استفاده کرد؟",
          "options": [
            "از فعل بودن «I am» (نه I have!)",
            "از فعل داشتن «I have»",
            "از فعل «I do»"
          ],
          "correctIdx": 0,
          "insightFa": "نکته طلایی ضد تداخل فارسی! در انگلیسی سن را «هستیم» (I am 13)، نه اینکه «داشته باشیم»."
        },
        "threeD": {
          "formFa": "How old + am/is/are + Subj? | Subj + am/is/are + عدد + (years old) | in + Month",
          "meaningFa": "بیان سن دقیق افراد و ماه تولد در تقویم شمسی یا میلادی",
          "useFa": "جلوگیری از خطای رایج ترجمه تحت‌اللفظی از فارسی (گفتن I have 13 years old غلط است!)"
        },
        "learnerGuide": {
          "explainFa": "در انگلیسی سن را با فعل بودن بیان می‌کنیم، نه با have: برای I از am و برای he یا she از is استفاده کن. برای پرسیدن سن می‌گوییم How old. پیش از نام ماه، in می‌آید.",
          "examples": [
            {
              "en": "I am thirteen years old.",
              "fa": "من سیزده ساله‌ام."
            },
            {
              "en": "My birthday is in May.",
              "fa": "تولد من در ماه مه است."
            }
          ]
        }
      },
      {
        "id": 4,
        "titleEn": "Lesson 4: My Family",
        "titleFa": "درس ۴: خانواده، شغل‌ها و مالکیت (a / an • 's)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "وقتی شغل کسی را با اسم مفرد بیان می‌کنیم، معمولاً پیش از آن «a» یا «an» می‌آید. انتخاب به صدای آغاز واژه بستگی دارد: «a» پیش از صدای همخوان و «an» پیش از صدای مصوت.",
        "formulas": [
          {
            "label": "پرسش شغل (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "subj",
                "text": "your father's job?"
              }
            ],
            "exampleEn": "He is an engineer.",
            "exampleFa": "او یک مهندس است.",
            "learnerGlossFa": "شغل پدرت چیست؟"
          },
          {
            "label": "شغل با do (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "does"
              },
              {
                "role": "subj",
                "text": "she"
              },
              {
                "role": "verb",
                "text": "do?"
              }
            ],
            "exampleEn": "She is a dentist.",
            "exampleFa": "او دندان‌پزشک است.",
            "learnerGlossFa": "او چه‌کاره است؟"
          }
        ],
        "signals": [
          "a teacher",
          "an engineer",
          "father's job",
          "What does he do"
        ],
        "traps": [
          {
            "wrong": "My uncle is mechanic.",
            "right": "My uncle is a mechanic.",
            "noteFa": "در این جمله برای شغل با اسم مفرد، پیش از «mechanic» از «a» استفاده می‌کنیم."
          },
          {
            "wrong": "She is a employee.",
            "right": "She is an employee.",
            "noteFa": "واژه «employee» با صدای مصوت آغاز می‌شود و «an» می‌گیرد."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "معرفی اعضای خانواده و الزام حرف تعریف a / an پیش از شغل مفرد",
        "contextDialogue": {
          "lineA": "What is your father's job?",
          "faA": "شغل پدرت چیست؟",
          "lineB": "He is an engineer, and my mother is a dentist.",
          "faB": "او مهندس است و مادرم دندان‌پزشک است."
        },
        "guidedDiscovery": {
          "questionFa": "چرا قبل از «engineer» واژه «an» ولی قبل از «dentist» واژه «a» آمده است؟",
          "options": [
            "چون «engineer» با صدای مصوت و «dentist» با صدای همخوان شروع می‌شود.",
            "چون پدر مذکر است و مادر مؤنث",
            "کاملاً سلیقه‌ای است"
          ],
          "correctIdx": 0,
          "insightFa": "برای شغل با اسم مفرد، معمولاً «a» یا «an» می‌آید. ملاک صدای اول است، نه فقط شکل حرف اول."
        },
        "threeD": {
          "formFa": "Subj + am/is/are + a/an + Job | Noun + 's (مالکیت)",
          "meaningFa": "بیان نسبت‌های خانوادگی و حرفه اعضای خانواده",
          "useFa": "برخلاف فارسی که می‌گوییم «پدرم مهندس است»، در انگلیسی حذف a/an قبل از شغل مفرد خطاست"
        },
        "learnerGuide": {
          "explainFa": "وقتی شغل یک نفر را با اسم مفرد بیان می‌کنیم، معمولاً پیش از آن a یا an می‌آید. انتخاب بر اساس صدای آغاز واژه است: a پیش از صدای همخوان و an پیش از صدای مصوت. برای پرسیدن شغل می‌توان از What does she do استفاده کرد.",
          "examples": [
            {
              "en": "He is a teacher.",
              "fa": "او معلم است."
            },
            {
              "en": "She is an engineer.",
              "fa": "او مهندس است."
            }
          ]
        }
      },
      {
        "id": 5,
        "titleEn": "Lesson 5: My Appearance",
        "titleFa": "درس ۵: توصیف ظاهر افراد (He's wearing … • He's the tall man)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "کتاب (ص ۲۸–۲۹) ظاهر افراد را این‌طور توصیف می‌کند: «Which one is your teacher? — He's the tall man. He's wearing a gray suit» یعنی «He's / She's the + صفت + اسم» و «He's / She's wearing + لباس». نکته‌های «has + مو و چشم»، «What does he look like?» و ترتیب صفت‌ها فراتر از کتاب‌اند و برای تمرین بیشتر آمده‌اند.",
        "formulas": [
          {
            "label": "الگوی کتاب (ص ۲۹)",
            "chips": [
              {
                "role": "subj",
                "text": "He's"
              },
              {
                "role": "obj",
                "text": "the tall man."
              },
              {
                "role": "subj",
                "text": "He's"
              },
              {
                "role": "verb",
                "text": "wearing"
              },
              {
                "role": "obj",
                "text": "a gray suit."
              }
            ],
            "exampleEn": "Which one is Dorna? — She's the young girl. She's wearing a gray scarf.",
            "exampleFa": "کدام‌یک درنا است؟ — همان دختر جوان. روسری خاکستری پوشیده است.",
            "learnerGlossFa": "او همان مرد قدبلند است. او کت‌وشلوار خاکستری پوشیده است."
          },
          {
            "label": "پرسش ظاهر (?) — فراتر از کتاب",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "does"
              },
              {
                "role": "subj",
                "text": "he"
              },
              {
                "role": "verb",
                "text": "look like?"
              }
            ],
            "exampleEn": "He is tall and thin.",
            "exampleFa": "او قدبلند و لاغر است.",
            "learnerGlossFa": "ظاهر او چگونه است؟"
          },
          {
            "label": "مو و چشم با has — فراتر از کتاب",
            "chips": [
              {
                "role": "subj",
                "text": "She"
              },
              {
                "role": "verb",
                "text": "has"
              },
              {
                "role": "obj",
                "text": "long black hair."
              }
            ],
            "exampleEn": "He has short black hair.",
            "exampleFa": "او موهای مشکی کوتاه دارد.",
            "learnerGlossFa": "او موهای بلند و مشکی دارد."
          }
        ],
        "signals": [
          "Which one is …?",
          "He's the tall man",
          "He's / She's wearing",
          "has … hair (فراتر از کتاب)"
        ],
        "traps": [
          {
            "wrong": "He's wearing a suit gray.",
            "right": "He's wearing a gray suit.",
            "noteFa": "کتاب (ص ۲۹): صفتِ رنگ قبل از اسم می‌آید، برعکسِ فارسی (کت‌وشلوارِ خاکستری)."
          },
          {
            "wrong": "He is black eyes.",
            "right": "He has black eyes.",
            "noteFa": "فراتر از کتاب: برای داشتن چشم یا مو از «has / have» استفاده می‌کنیم، نه «is»."
          },
          {
            "wrong": "black short hair",
            "right": "short black hair",
            "noteFa": "فراتر از کتاب: صفت اندازه (short/long) قبل از صفت رنگ (black/brown) قرار می‌گیرد."
          }
        ],
        "timelineType": "clause_link",
        "timelineCaptionFa": "توصیف فرد با «He's the tall man» و لباسش با «He's wearing …» (کتاب ص ۲۸–۲۹)",
        "contextDialogue": {
          "lineA": "Is that your English teacher?",
          "faA": "آن آقا معلم انگلیسی توست؟",
          "lineB": "No, my English teacher is the tall man. He's wearing a gray suit.",
          "faB": "نه، معلم انگلیسی من آن مرد قدبلند است. کت‌وشلوار خاکستری پوشیده است."
        },
        "guidedDiscovery": {
          "questionFa": "در جملهٔ «He's wearing a gray suit»، صفتِ رنگ (gray) کجای اسم (suit) آمده است؟",
          "options": [
            "قبل از اسم: a gray suit",
            "بعد از اسم: a suit gray",
            "هر دو جا درست است"
          ],
          "correctIdx": 0,
          "insightFa": "درست است! در انگلیسی صفت قبل از اسم می‌آید: «a gray suit» (کتاب ص ۲۸)؛ برعکسِ فارسی که می‌گوییم «کت‌وشلوارِ خاکستری»."
        },
        "threeD": {
          "formFa": "Which one is …? | He's / She's the + صفت + اسم | He's / She's wearing + لباس | فراتر از کتاب: has + مو و چشم، ترتیب صفت",
          "meaningFa": "توصیف ویژگی‌های دیداری چهره، اندام و پوشش افراد",
          "useFa": "شناسایی افراد از روی ظاهر و تفکیک آن از شخصیت اخلاقی (که در پایه نهم با What is he like می‌آید)"
        },
        "learnerGuide": {
          "explainFa": "برای مشخص کردن فرد از روی ظاهر می‌توان بعد از he is یا she is یک صفت و اسم آورد. برای لباسی که فرد اکنون پوشیده، از is wearing استفاده کن. پرسش دربارهٔ ظاهر و مثال‌های مربوط به مو و چشم، در این درس تمرین تکمیلی فراتر از کتاب هستند.",
          "examples": [
            {
              "en": "He's the tall man.",
              "fa": "او همان مرد قدبلند است."
            },
            {
              "en": "She's wearing a gray scarf.",
              "fa": "او روسری خاکستری پوشیده است."
            }
          ]
        }
      },
      {
        "id": 6,
        "titleEn": "Lesson 6: My House",
        "titleFa": "درس ۶: بخش‌های خانه و کارهای در حال انجام (Where • V-ing)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "مکان افراد در اتاق‌های خانه با «Where is ...? — in the kitchen» و کارِ در حال انجام با «am/is/are + فعل + ing» بیان می‌شود.",
        "formulas": [
          {
            "label": "مکان در خانه (?)",
            "chips": [
              {
                "role": "sig",
                "text": "Where"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "subj",
                "text": "they?"
              }
            ],
            "exampleEn": "They are in the living room.",
            "exampleFa": "آن‌ها در اتاق نشیمن هستند.",
            "learnerGlossFa": "آن‌ها کجا هستند؟"
          },
          {
            "label": "در حال انجام (+)",
            "chips": [
              {
                "role": "subj",
                "text": "She"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "verb",
                "text": "cooking"
              },
              {
                "role": "obj",
                "text": "lunch."
              }
            ],
            "exampleEn": "I am watching TV now.",
            "exampleFa": "من الان مشغول تماشای تلویزیون هستم.",
            "learnerGlossFa": "او در حال پختن ناهار است."
          }
        ],
        "signals": [
          "in the kitchen",
          "upstairs",
          "What is he doing",
          "watching / reading"
        ],
        "traps": [
          {
            "wrong": "He watching TV.",
            "right": "He is watching TV.",
            "noteFa": "برای ساخت حال استمراری، شکل «-ing» فعل با «am / is / are» همراه می‌شود."
          },
          {
            "wrong": "Where are your father? — In the garage.",
            "right": "Where is your father? — In the garage.",
            "noteFa": "فاعل «your father» مفرد است؛ بنابراین فعل پرسشی حتماً باید «is» باشد نه «are»."
          }
        ],
        "timelineType": "present_now",
        "timelineCaptionFa": "هم‌زمانی فعالیت جاری در بخش‌های خانه با لحظه صحبت (Now)",
        "contextDialogue": {
          "lineA": "Where is your mother? What is she doing?",
          "faA": "مادرت کجاست؟ مشغول چه کاری است؟",
          "lineB": "She is in the kitchen. She is cooking lunch now.",
          "faB": "او در آشپزخانه است. الان دارد ناهار می‌پزد."
        },
        "guidedDiscovery": {
          "questionFa": "کدام دو بخش در کنار هم نشان می‌دهند کار «همین الان» در جریان است؟",
          "options": [
            "فعل کمکی «is» به همراه «-ing» در انتهای فعل اصلی (is cooking)",
            "فقط حرف اضافه in",
            "فقط واژه lunch"
          ],
          "correctIdx": 0,
          "insightFa": "در ساخت حال استمراری، شکل «V-ing» با «am / is / are» همراه می‌شود؛ مانند «is cooking»."
        },
        "threeD": {
          "formFa": "Where + is/are + Subj? → in the + اتاق | Subj + am/is/are + Verb-ing",
          "meaningFa": "بیان حضور فرد در یک مکان و کاری که در همان لحظه در حال انجامش است",
          "useFa": "مکالمات روزمره خانگی و تلفنی درباره وضعیت فعلی اعضای خانواده"
        },
        "learnerGuide": {
          "explainFa": "برای پرسیدن مکان از Where و شکل مناسب فعل بودن استفاده می‌کنیم؛ پاسخ می‌تواند نام اتاق را با in بیان کند. برای کاری که همین حالا در جریان است، بعد از am، is یا are شکل ing فعل را می‌آوریم.",
          "examples": [
            {
              "en": "They are in the kitchen.",
              "fa": "آن‌ها در آشپزخانه هستند."
            },
            {
              "en": "She is cooking lunch.",
              "fa": "او در حال پختن ناهار است."
            }
          ]
        }
      },
      {
        "id": 7,
        "titleEn": "Lesson 7: My Address",
        "titleFa": "درس ۷: نشانی، تلفن و ساعت (at + ساعت • What time)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای بیان ساعتِ انجام کار از حرف اضافه «at» (مثل at 7:30) و برای پرسیدن ساعت از «What time is it?» استفاده می‌کنیم.",
        "formulas": [
          {
            "label": "پرسش ساعت (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What time"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "subj",
                "text": "it?"
              }
            ],
            "exampleEn": "It's seven thirty.",
            "exampleFa": "ساعت هفت و سی دقیقه است.",
            "learnerGlossFa": "ساعت چند است؟"
          },
          {
            "label": "زمان فعالیت (+)",
            "chips": [
              {
                "role": "subj",
                "text": "I"
              },
              {
                "role": "verb",
                "text": "go to work"
              },
              {
                "role": "sig",
                "text": "at"
              },
              {
                "role": "obj",
                "text": "7:00 a.m."
              }
            ],
            "exampleEn": "Our class starts at 8 o'clock.",
            "exampleFa": "کلاس ما ساعت ۸ شروع می‌شود.",
            "learnerGlossFa": "من ساعت هفت صبح به سر کار می‌روم."
          }
        ],
        "signals": [
          "What time",
          "at 7:30",
          "a.m. / p.m.",
          "address"
        ],
        "traps": [
          {
            "wrong": "I get up in 6 o'clock.",
            "right": "I get up at 6 o'clock.",
            "noteFa": "قبل از ساعت دقیق همیشه «at» می‌آید، نه «in»."
          },
          {
            "wrong": "Our school is at Azadi Street.",
            "right": "Our school is on Azadi Street.",
            "noteFa": "برای نام خیابان بدون شماره پلاک از «on» و برای آدرس دارای شماره پلاک (مثل at 14 Azadi St.) از «at» استفاده می‌کنیم."
          }
        ],
        "timelineType": "habit_dots",
        "timelineCaptionFa": "بیان ساعت دقیق با at و تمایز خیابان با پلاک (at) و بدون پلاک (on)",
        "contextDialogue": {
          "lineA": "What time do you go to school? And where do you live?",
          "faA": "چه ساعتی به مدرسه می‌روی؟ و کجا زندگی می‌کنی؟",
          "lineB": "I go at 7:15 a.m. We live on Azadi Street.",
          "faB": "ساعت ۷:۱۵ صبح می‌روم. ما در خیابان آزادی زندگی می‌کنیم."
        },
        "guidedDiscovery": {
          "questionFa": "چه زمانی قبل از نام خیابان به جای «on» از «at» استفاده می‌کنیم؟",
          "options": [
            "وقتی شماره پلاک هم ذکر شود (مثل at 24 Azadi Street)",
            "وقتی خیابان بزرگ باشد",
            "همیشه فقط از in استفاده می‌شود"
          ],
          "correctIdx": 0,
          "insightFa": "آفرین! خیابان به‌تنهایی «on» می‌گیرد، اما نشانی دقیق با شماره پلاک (و نیز ساعت دقیق) «at» می‌گیرد."
        },
        "threeD": {
          "formFa": "What time is it? | at + ساعت | on + Street / at + پلاک + Street",
          "meaningFa": "تعیین زمان دقیق رویدادهای روزانه و نشانی محل سکونت",
          "useFa": "هماهنگی قرارها، برنامه کلاسی و دادن آدرس و شماره تلفن"
        },
        "learnerGuide": {
          "explainFa": "برای پرسیدن ساعت می‌گوییم What time is it. وقتی ساعت انجام یک کار را می‌گوییم، پیش از ساعت مشخص معمولاً at می‌آید. عدد ساعت و بخش صبح یا بعدازظهر را با توجه به موقعیت می‌خوانیم.",
          "examples": [
            {
              "en": "What time is it?",
              "fa": "ساعت چند است؟"
            },
            {
              "en": "Our class starts at eight.",
              "fa": "کلاس ما ساعت هشت شروع می‌شود."
            }
          ]
        }
      },
      {
        "id": 8,
        "titleEn": "Lesson 8: My Favorite Food",
        "titleFa": "درس ۸: غذا و پیشنهاد (I'd like some • How about …?)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "کتاب (ص ۴۲–۴۳) برای پیشنهاد و درخواست مؤدبانه این الگوها را دارد: «I'm hungry. How about you?»، «I'd like some tea with my cake» و «How about some cake and milk?». تعارف با «Would you like …?» فراتر از کتاب است و برای تمرین بیشتر آمده است.",
        "formulas": [
          {
            "label": "پیشنهاد و درخواست (کتاب ص ۴۲–۴۳)",
            "chips": [
              {
                "role": "subj",
                "text": "I'd like"
              },
              {
                "role": "obj",
                "text": "some tea."
              },
              {
                "role": "sig",
                "text": "How about"
              },
              {
                "role": "obj",
                "text": "some cake?"
              }
            ],
            "exampleEn": "I'm hungry. How about you? — I'd like some cake and milk.",
            "exampleFa": "گرسنه‌ام. تو چطور؟ — من کمی کیک و شیر می‌خواهم.",
            "learnerGlossFa": "کمی چای میل دارم. کمی کیک چطور است؟"
          },
          {
            "label": "تعارف با Would you like — فراتر از کتاب",
            "chips": [
              {
                "role": "aux",
                "text": "Would"
              },
              {
                "role": "subj",
                "text": "you"
              },
              {
                "role": "verb",
                "text": "like"
              },
              {
                "role": "obj",
                "text": "some tea?"
              }
            ],
            "exampleEn": "Would you like some chicken?",
            "exampleFa": "کمی مرغ میل دارید؟",
            "learnerGlossFa": "کمی چای میل دارید؟"
          },
          {
            "label": "غذای محبوب (+)",
            "chips": [
              {
                "role": "subj",
                "text": "My favorite food"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "obj",
                "text": "kebab."
              }
            ],
            "exampleEn": "My favorite food is rice.",
            "exampleFa": "غذای موردعلاقهٔ من برنج است.",
            "learnerGlossFa": "غذای محبوب من کباب است."
          }
        ],
        "signals": [
          "I'd like some …",
          "How about some …?",
          "hungry / thirsty",
          "Would you like (فراتر از کتاب)"
        ],
        "traps": [
          {
            "wrong": "My favorite food are rice and fish.",
            "right": "My favorite food is rice and fish.",
            "noteFa": "هسته فاعل «My favorite food» مفرد است و فعل «is» می‌گیرد."
          },
          {
            "wrong": "Are you like kebabs and rice?",
            "right": "Do you like kebabs and rice?",
            "noteFa": "برای پرسش با فعل اصلی «like» در معنای دوست‌داشتن، در این جمله از «Do / Does» استفاده می‌کنیم، نه «Are»."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "درخواست با «I'd like some …» و پیشنهاد با «How about some …?» (کتاب ص ۴۲–۴۳)",
        "contextDialogue": {
          "lineA": "Let's have some cake and milk.",
          "faA": "بیا کمی کیک و شیر بخوریم.",
          "lineB": "Sounds good, but I'd like some tea with my cake.",
          "faB": "خوب است، ولی من با کیکم کمی چای می‌خواهم."
        },
        "guidedDiscovery": {
          "questionFa": "در «I'd like some tea with my cake»، «I'd like» چه معنایی دارد؟",
          "options": [
            "می‌خواهم (درخواست مؤدبانه)",
            "دوست داشتم (گذشته)",
            "شبیه … هستم"
          ],
          "correctIdx": 0,
          "insightFa": "آفرین! «I'd like» همان «I would like» است یعنی «می‌خواهم» و مؤدبانه است؛ برای پیشنهاد هم می‌گوییم «How about some cake and milk?» (کتاب ص ۴۲–۴۳)."
        },
        "threeD": {
          "formFa": "I'd like some + خوراکی | How about some …? / How about you? | فراتر از کتاب: Would you like some …?",
          "meaningFa": "ابراز علاقه غذایی و تعارف محترمانه در مهمانی یا رستوران",
          "useFa": "رعایت ادب ارتباطی (Politeness) به جای پرسش خشک Do you want..."
        },
        "learnerGuide": {
          "explainFa": "برای درخواست مؤدبانه می‌توان گفت I would like یا شکل کوتاه آن I’d like. عبارت How about برای پیشنهاد نیز به کار می‌رود و می‌تواند با اسم غذا همراه شود. الگوی Would you like در این درس به عنوان تمرین تکمیلی فراتر از کتاب معرفی شده است.",
          "examples": [
            {
              "en": "I'd like some tea.",
              "fa": "کمی چای میل دارم."
            },
            {
              "en": "How about some cake?",
              "fa": "کمی کیک چطور است؟"
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "p1_l1_1",
        "lesson": 1,
        "ruleTag": "فعل to be در معرفی",
        "sentence": "Hello, my name is Amir.",
        "target": "is",
        "cloze": "Hello, my name _____ Amir.",
        "promptHint": "be",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "fa": "سلام، نام من امیر است.",
        "explainFa": "فاعل «my name» سوم‌شخص مفرد است؛ پس «is» می‌گیرد.",
        "chunks": [
          "Hello, my",
          "name",
          "am",
          "Amir."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "Hello, my name am Amir.",
        "matchLeft": "My name",
        "matchRight": "is Amir"
      },
      {
        "id": "p1_l1_2",
        "lesson": 1,
        "ruleTag": "پرسش احوال‌پرسی",
        "sentence": "Hi Sara! How are you today?",
        "target": "are",
        "cloze": "Hi Sara! How _____ you today?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "do"
        ],
        "fa": "سلام سارا! امروز چطوری؟",
        "explainFa": "همراه ضمیر «you» همواره فعل کمکی «are» می‌آید.",
        "chunks": [
          "Hi Sara!",
          "How",
          "is",
          "you today?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "are",
        "flawedSentence": "Hi Sara! How is you today?",
        "matchLeft": "How ___ you?",
        "matchRight": "are"
      },
      {
        "id": "p1_l1_3",
        "lesson": 1,
        "ruleTag": "پرسش نام خانوادگی",
        "sentence": "Excuse me, what is your last name?",
        "target": "what",
        "cloze": "Excuse me, _____ is your last name?",
        "promptHint": "Wh-",
        "options": [
          "what",
          "who",
          "how",
          "where"
        ],
        "fa": "ببخشید، نام خانوادگی شما چیست؟",
        "explainFa": "برای پرسیدن نام یا نام خانوادگی از «What» استفاده می‌شود.",
        "chunks": [
          "Excuse me,",
          "who",
          "is your",
          "last name?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "what",
        "flawedSentence": "Excuse me, who is your last name?",
        "matchLeft": "___ is your name?",
        "matchRight": "What",
        "noTyping": true
      },
      {
        "id": "p1_l1_4",
        "lesson": 1,
        "ruleTag": "معرفی با ضمیر I",
        "sentence": "I am a new student in this school.",
        "target": "am",
        "cloze": "I _____ a new student in this school.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من دانش‌آموز جدیدی در این مدرسه هستم.",
        "explainFa": "ضمیر اول‌شخص مفرد «I» با «am» به کار می‌رود.",
        "chunks": [
          "I",
          "is",
          "a new student",
          "in this school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is a new student in this school.",
        "matchLeft": "I ___ a student.",
        "matchRight": "am"
      },
      {
        "id": "p1_l1_5",
        "lesson": 1,
        "ruleTag": "املای نام کوچک",
        "sentence": "How do you spell your first name, please?",
        "target": "How",
        "cloze": "_____ do you spell your first name, please?",
        "promptHint": "Wh-",
        "options": [
          "How",
          "Who",
          "Where",
          "When"
        ],
        "fa": "لطفاً نام کوچکت را چطور هجی می‌کنی؟",
        "explainFa": "پرسش استاندارد هجی کردن نام در درس اول هفتم با «How do you spell ...?» ساخته می‌شود.",
        "chunks": [
          "Who",
          "do you",
          "spell your first",
          "name, please?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How",
        "flawedSentence": "Who do you spell your first name, please?",
        "matchLeft": "___ do you spell it?",
        "matchRight": "How",
        "noTyping": true
      },
      {
        "id": "p1_l2_1",
        "lesson": 2,
        "ruleTag": "پرسش هویت فرد",
        "sentence": "Who is that tall boy near the door?",
        "target": "Who",
        "cloze": "_____ is that tall boy near the door?",
        "promptHint": "Wh-",
        "options": [
          "Who",
          "What",
          "When",
          "Who are"
        ],
        "fa": "آن پسر قدبلند کنار در کیست؟",
        "explainFa": "برای پرسش درباره اشخاص از «Who» (چه کسی) استفاده می‌کنیم.",
        "chunks": [
          "What",
          "is that",
          "tall boy",
          "near the door?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Who",
        "flawedSentence": "What is that tall boy near the door?",
        "matchLeft": "___ is that girl?",
        "matchRight": "Who",
        "noTyping": true
      },
      {
        "id": "p1_l2_2",
        "lesson": 2,
        "ruleTag": "ضمیر مؤنث She",
        "sentence": "This is Zahra. She is my best friend.",
        "target": "She",
        "cloze": "This is Zahra. _____ is my best friend.",
        "promptHint": "pronoun",
        "options": [
          "She",
          "He",
          "His",
          "It"
        ],
        "fa": "این زهراست. او بهترین دوست من است.",
        "explainFa": "برای اشاره به نام مؤنث (Zahra) ضمیر فاعلی «She» صحیح است.",
        "chunks": [
          "This is Zahra.",
          "He",
          "is my",
          "best friend."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "She",
        "flawedSentence": "This is Zahra. He is my best friend.",
        "matchLeft": "Zahra (فاعل)",
        "matchRight": "She",
        "noTyping": true
      },
      {
        "id": "p1_l2_3",
        "lesson": 2,
        "ruleTag": "صفت ملکی مذکر his",
        "sentence": "That is my classmate, Sina. His bag is blue.",
        "target": "His",
        "cloze": "That is my classmate, Sina. _____ bag is blue.",
        "promptHint": "possessive",
        "options": [
          "His",
          "Her",
          "She",
          "He"
        ],
        "fa": "آن هم‌کلاسی من سیناست. کیفش آبی است.",
        "explainFa": "قبل از اسم (bag) برای مالک مذکر صفت ملکی «His» می‌آید.",
        "chunks": [
          "That is",
          "my classmate, Sina.",
          "He",
          "bag is blue."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "His",
        "flawedSentence": "That is my classmate, Sina. He bag is blue.",
        "matchLeft": "کیفِ او (مذکر)",
        "matchRight": "his bag",
        "noTyping": true
      },
      {
        "id": "p1_l2_4",
        "lesson": 2,
        "ruleTag": "اشاره به مفرد that",
        "sentence": "Look! That woman over there is our English teacher.",
        "target": "That",
        "cloze": "Look! _____ woman over there is our English teacher.",
        "promptHint": "that",
        "options": [
          "That",
          "This",
          "These",
          "Those"
        ],
        "fa": "نگاه کن! آن خانم آنجا معلم انگلیسی ماست.",
        "explainFa": "«over there» یعنی دور؛ برای یک نفرِ دور از «That» استفاده می‌کنیم، نه «This».",
        "chunks": [
          "Look!",
          "This",
          "woman over there is",
          "our English teacher."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "That",
        "flawedSentence": "Look! This woman over there is our English teacher.",
        "matchLeft": "That woman",
        "matchRight": "over there",
        "noTyping": true
      },
      {
        "id": "p1_l2_5",
        "lesson": 2,
        "ruleTag": "صفت ملکی مؤنث her",
        "sentence": "That girl is my cousin; her name is Parisa.",
        "target": "her",
        "cloze": "That girl is my cousin; _____ name is Parisa.",
        "promptHint": "possessive",
        "options": [
          "her",
          "his",
          "she",
          "he"
        ],
        "fa": "آن دختر دخترعموی من است؛ نامش پریسا است.",
        "explainFa": "برای مالک مؤنث (That girl) پیش از اسم «name» صفت ملکی «her» می‌آید.",
        "chunks": [
          "That girl is",
          "my cousin;",
          "she",
          "name is Parisa."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "her",
        "flawedSentence": "That girl is my cousin; she name is Parisa.",
        "matchLeft": "نامِ او (مؤنث)",
        "matchRight": "her name",
        "noTyping": true
      },
      {
        "id": "p1_l3_1",
        "lesson": 3,
        "ruleTag": "بیان سن با to be",
        "sentence": "My little brother is nine years old.",
        "target": "is",
        "cloze": "My little brother _____ nine years old.",
        "promptHint": "be",
        "options": [
          "is",
          "has",
          "have",
          "are"
        ],
        "fa": "برادر کوچکم نُه ساله است.",
        "explainFa": "سن در انگلیسی با افعال «am/is/are» بیان می‌شود، نه «has/have».",
        "chunks": [
          "My little",
          "brother",
          "has",
          "nine years old."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My little brother has nine years old.",
        "matchLeft": "بیان سن در انگلیسی",
        "matchRight": "am / is / are",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l3_2",
        "lesson": 3,
        "ruleTag": "حرف اضافه ماه‌های سال",
        "sentence": "My mother's birthday is in Mordad.",
        "target": "in",
        "cloze": "My mother's birthday is _____ Mordad.",
        "promptHint": "prep",
        "options": [
          "in",
          "on",
          "at",
          "to"
        ],
        "fa": "تولد مادرم در ماه مرداد است.",
        "explainFa": "پیش از نام ماه‌های سال همواره حرف اضافه «in» به کار می‌رود.",
        "chunks": [
          "My mother's",
          "birthday is",
          "on",
          "Mordad."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My mother's birthday is on Mordad.",
        "matchLeft": "___ Mehr / May",
        "matchRight": "in",
        "noTyping": true
      },
      {
        "id": "p1_l3_3",
        "lesson": 3,
        "ruleTag": "پرسش سن با How old",
        "sentence": "How old are your twin sisters? — They are ten.",
        "target": "How old",
        "cloze": "_____ are your twin sisters? — They are ten.",
        "promptHint": "Wh-",
        "options": [
          "How old",
          "How many",
          "Who",
          "When"
        ],
        "fa": "خواهرهای دوقلویت چند سالشان است؟ — ده سالشان است.",
        "explainFa": "برای پرسیدن سن «How old» می‌آید؛ «How many» (چند تا) برای شمارش است. در فارسی «چند سالشان است؟» می‌گوییم، برای همین گاهی اشتباهی «How many» به کار می‌رود.",
        "chunks": [
          "How many",
          "are your",
          "twin sisters?",
          "— They",
          "are ten."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How old",
        "flawedSentence": "How many are your twin sisters? — They are ten.",
        "matchLeft": "پرسش از سن",
        "matchRight": "How old",
        "noTyping": true
      },
      {
        "id": "p1_l3_4",
        "lesson": 3,
        "ruleTag": "پرسش زمان تولد",
        "sentence": "When is your birthday, Nima?",
        "target": "When",
        "cloze": "_____ is your birthday, Nima?",
        "promptHint": "Wh-",
        "options": [
          "When",
          "Who",
          "How old",
          "How many"
        ],
        "fa": "تولدت کی است، نیما؟",
        "explainFa": "برای پرسیدن زمان تولد «When» می‌آید. در فارسی «کی» هم به معنی «چه کسی» است و هم «چه وقت»؛ برای همین گاهی اشتباهی «Who» می‌گوییم.",
        "chunks": [
          "Who",
          "is",
          "your",
          "birthday,",
          "Nima?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "When",
        "flawedSentence": "Who is your birthday, Nima?",
        "matchLeft": "پرسش زمان تولد",
        "matchRight": "When",
        "noTyping": true
      },
      {
        "id": "p1_l3_5",
        "lesson": 3,
        "ruleTag": "سن افراد جمع با are",
        "sentence": "Sina and Hamid are fourteen years old.",
        "target": "are",
        "cloze": "Sina and Hamid _____ fourteen years old.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "have",
          "am"
        ],
        "fa": "سینا و حمید چهارده ساله هستند.",
        "explainFa": "فاعل جمع «Sina and Hamid» برای بیان سن فعل «are» می‌گیرد.",
        "chunks": [
          "Sina and Hamid",
          "have",
          "fourteen years",
          "old."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "Sina and Hamid have fourteen years old.",
        "matchLeft": "Sina & Ali ___ 14.",
        "matchRight": "are",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l4_1",
        "lesson": 4,
        "ruleTag": "حرف تعریف an قبل از مصوت",
        "sentence": "My uncle is an engineer in a big factory.",
        "target": "an",
        "cloze": "My uncle is _____ engineer in a big factory.",
        "promptHint": "a / an",
        "options": [
          "an",
          "a",
          "some",
          "one"
        ],
        "fa": "عمویم مهندس یک کارخانه بزرگ است.",
        "explainFa": "واژه «engineer» با صدای مصوت آغاز می‌شود؛ پس «an» می‌گیرد.",
        "chunks": [
          "My uncle is",
          "a",
          "engineer in",
          "a big factory."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "an",
        "flawedSentence": "My uncle is a engineer in a big factory.",
        "matchLeft": "___ engineer",
        "matchRight": "an"
      },
      {
        "id": "p1_l4_2",
        "lesson": 4,
        "ruleTag": "حرف تعریف a قبل از شغل",
        "sentence": "Her mother is a nurse at Shahid Beheshti Hospital.",
        "target": "a",
        "cloze": "Her mother is _____ nurse at Shahid Beheshti Hospital.",
        "promptHint": "a / an",
        "options": [
          "a",
          "an",
          "one",
          "some"
        ],
        "fa": "مادر او پرستار بیمارستان شهید بهشتی است.",
        "explainFa": "قبل از شغل مفرد با صدای همخوان (nurse) آوردن «a» ضروری است.",
        "chunks": [
          "Her mother",
          "is",
          "nurse",
          "at Shahid Beheshti Hospital."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "a nurse",
        "flawedSentence": "Her mother is nurse at Shahid Beheshti Hospital.",
        "matchLeft": "___ nurse / dentist",
        "matchRight": "a"
      },
      {
        "id": "p1_l4_3",
        "lesson": 4,
        "ruleTag": "پرسش از شغل با do",
        "sentence": "What does your older brother do?",
        "target": "does",
        "cloze": "What _____ your older brother do?",
        "promptHint": "do / does",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "برادر بزرگ‌ترت چه کاره است؟",
        "explainFa": "در الگوی «What ... do?» برای فاعل مفرد (brother) فعل کمکی «does» می‌آید.",
        "chunks": [
          "What",
          "is",
          "your older brother",
          "do?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "What is your older brother do?",
        "matchLeft": "What ___ he do?",
        "matchRight": "does"
      },
      {
        "id": "p1_l4_4",
        "lesson": 4,
        "ruleTag": "آپوستروف مالکیت 's",
        "sentence": "What is your father's job?",
        "target": "father's",
        "cloze": "What is your _____ job?",
        "promptHint": "possessive 's",
        "options": [
          "father's",
          "father",
          "fathers",
          "father is"
        ],
        "fa": "شغل پدرت چیست؟",
        "explainFa": "برای نشان دادن مالکیت اسم مفرد (شغلِ پدر) از «'s» استفاده می‌شود.",
        "chunks": [
          "What is",
          "your",
          "father",
          "job?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "father's",
        "flawedSentence": "What is your father job?",
        "matchLeft": "شغلِ پدر",
        "matchRight": "father's job",
        "noTyping": true
      },
      {
        "id": "p1_l4_5",
        "lesson": 4,
        "ruleTag": "شغل خانه دار housewife",
        "sentence": "My aunt is a housewife and bakes delicious cakes.",
        "target": "a housewife",
        "cloze": "My aunt is _____ and bakes delicious cakes.",
        "promptHint": "a + job",
        "options": [
          "a housewife",
          "housewife",
          "an housewife",
          "housewives"
        ],
        "fa": "خاله‌ام خانه‌دار است و کیک‌های خوشمزه‌ای می‌پزد.",
        "explainFa": "در این جمله پیش از شغل مفرد «housewife» با صدای همخوان، از حرف تعریف «a» استفاده می‌کنیم.",
        "chunks": [
          "My aunt is",
          "an housewife",
          "and bakes",
          "delicious cakes."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "a housewife",
        "flawedSentence": "My aunt is an housewife and bakes delicious cakes.",
        "matchLeft": "She is ___.",
        "matchRight": "a housewife"
      },
      {
        "id": "p1_l5_1",
        "lesson": 5,
        "ruleTag": "پرسش ویژگی ظاهری",
        "sentence": "What does your new teacher look like? — She is tall and has short hair.",
        "target": "look like",
        "cloze": "What does your new teacher _____? — She is tall and has short hair.",
        "promptHint": "look like (شکل درست)",
        "options": [
          "look like",
          "looks like",
          "like",
          "looking"
        ],
        "fa": "معلم جدیدت چه شکلی است؟ — قدبلند است و موی کوتاه دارد.",
        "explainFa": "فراتر از کتاب — بعد از «does» فعل به شکل ساده می‌آید: «What does ... look like?».",
        "chunks": [
          "What does your new teacher",
          "looks like?",
          "— She is tall",
          "and has short hair."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "look like?",
        "flawedSentence": "What does your new teacher looks like? — She is tall and has short hair.",
        "matchLeft": "What does he ___?",
        "matchRight": "look like"
      },
      {
        "id": "p1_l5_2",
        "lesson": 5,
        "ruleTag": "داشتن مو و چشم با has",
        "sentence": "My grandfather has short white hair.",
        "target": "has",
        "cloze": "My grandfather _____ short white hair.",
        "promptHint": "have / has",
        "options": [
          "has",
          "is",
          "have",
          "are"
        ],
        "fa": "پدربزرگم موهای کوتاه و سفید دارد.",
        "explainFa": "فراتر از کتاب — برای بیان ویژگی مو یا چشم از «has / have» استفاده می‌کنیم، نه «is».",
        "chunks": [
          "My grandfather",
          "is",
          "short white",
          "hair."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "My grandfather is short white hair.",
        "matchLeft": "He ___ brown eyes.",
        "matchRight": "has",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_3",
        "lesson": 5,
        "ruleTag": "ترتیب صفت اندازه و رنگ",
        "sentence": "The little girl has long brown hair.",
        "target": "long brown",
        "cloze": "The little girl has _____ hair.",
        "promptHint": "adj order",
        "options": [
          "long brown",
          "brown long",
          "longs brown",
          "a long brown"
        ],
        "fa": "آن دختر کوچک موهای بلند قهوه‌ای دارد.",
        "explainFa": "فراتر از کتاب — در انگلیسی صفت اندازه (long) قبل از صفت رنگ (brown) می‌آید.",
        "chunks": [
          "The little girl",
          "has",
          "brown long",
          "hair."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "long brown",
        "flawedSentence": "The little girl has brown long hair.",
        "matchLeft": "اندازه + رنگ مو",
        "matchRight": "long brown hair",
        "noTyping": true
      },
      {
        "id": "p1_l5_4",
        "lesson": 5,
        "ruleTag": "توصیف قد و سن با is",
        "sentence": "Mr. Karimi is tall and young.",
        "target": "is",
        "cloze": "Mr. Karimi _____ tall and young.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "آقای کریمی قدبلند و جوان است.",
        "explainFa": "برای توصیف قد و سن (tall, young) از «is» استفاده می‌کنیم؛ «Mr. Karimi» یک نفر است، پس «are» درست نیست.",
        "chunks": [
          "Mr. Karimi",
          "are",
          "tall and",
          "young."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Mr. Karimi are tall and young.",
        "matchLeft": "She ___ tall.",
        "matchRight": "is",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l5_5",
        "lesson": 5,
        "ruleTag": "پوشیدن لباس در حال حاضر",
        "sentence": "Our school principal is wearing a gray suit today.",
        "target": "is wearing",
        "cloze": "Our school principal _____ a gray suit today.",
        "promptHint": "wearing",
        "options": [
          "is wearing",
          "are wearing",
          "wear",
          "wearing"
        ],
        "fa": "مدیر مدرسه ما امروز کت‌وشلوار خاکستری پوشیده است.",
        "explainFa": "برای توصیف لباسِ بر تن فرد (امروز) از «is wearing» استفاده می‌شود.",
        "chunks": [
          "Our school principal",
          "are wearing",
          "a gray",
          "suit today."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is wearing",
        "flawedSentence": "Our school principal are wearing a gray suit today.",
        "matchLeft": "He ___ a blue shirt.",
        "matchRight": "is wearing"
      },
      {
        "id": "p1_l6_1",
        "lesson": 6,
        "ruleTag": "فعالیت در حال انجام",
        "sentence": "Quiet, please! My baby sister is sleeping in the bedroom.",
        "target": "is sleeping",
        "cloze": "Quiet, please! My baby sister _____ in the bedroom.",
        "promptHint": "present cont.",
        "options": [
          "is sleeping",
          "sleeping",
          "are sleeping",
          "is sleep"
        ],
        "fa": "لطفاً ساکت! خواهر کوچکم در اتاق‌خواب در حال خوابیدن است.",
        "explainFa": "برای کاری که همین لحظه جریان دارد از «is + V-ing» استفاده می‌کنیم.",
        "chunks": [
          "Quiet, please!",
          "My baby sister",
          "sleeping",
          "in the bedroom."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is sleeping",
        "flawedSentence": "Quiet, please! My baby sister sleeping in the bedroom.",
        "matchLeft": "She ___ sleeping now.",
        "matchRight": "is",
        "noTyping": true
      },
      {
        "id": "p1_l6_2",
        "lesson": 6,
        "ruleTag": "حرف اضافه اتاق‌های خانه",
        "sentence": "My parents are sitting in the living room.",
        "target": "in",
        "cloze": "My parents are sitting _____ the living room.",
        "promptHint": "prep",
        "options": [
          "in",
          "on",
          "at",
          "into"
        ],
        "fa": "والدینم در اتاق نشیمن نشسته‌اند.",
        "explainFa": "برای داخل اتاق‌های خانه حرف اضافه «in» به کار می‌رود.",
        "chunks": [
          "My parents",
          "are sitting",
          "at",
          "the living room."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My parents are sitting at the living room.",
        "matchLeft": "___ the kitchen",
        "matchRight": "in",
        "noTyping": true
      },
      {
        "id": "p1_l6_3",
        "lesson": 6,
        "ruleTag": "پرسش از کار در حال انجام",
        "sentence": "What are the boys doing in the yard?",
        "target": "doing",
        "cloze": "What are the boys _____ in the yard?",
        "promptHint": "V-ing",
        "options": [
          "doing",
          "do",
          "does",
          "did"
        ],
        "fa": "پسرها در حیاط مشغول چه کاری هستند؟",
        "explainFa": "همراه «are» در پرسش از عملِ در حال انجام، فعل «doing» می‌آید.",
        "chunks": [
          "What are",
          "the boys",
          "do",
          "in the yard?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "doing",
        "flawedSentence": "What are the boys do in the yard?",
        "matchLeft": "What is she ___?",
        "matchRight": "doing",
        "noTyping": true
      },
      {
        "id": "p1_l6_4",
        "lesson": 6,
        "ruleTag": "پرسش مکان مفرد Where is",
        "sentence": "Where is your grandfather? — He is in the yard.",
        "target": "Where is",
        "cloze": "_____ your grandfather? — He is in the yard.",
        "promptHint": "Wh + is",
        "options": [
          "Where is",
          "Where are",
          "Who is",
          "When is"
        ],
        "fa": "پدربزرگت کجاست؟ — او در حیاط است.",
        "explainFa": "پاسخ مکان (in the yard) و فاعل مفرد (grandfather) است؛ پس «Where is» درست است.",
        "chunks": [
          "Where are",
          "your grandfather? —",
          "He is",
          "in the yard."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Where is",
        "flawedSentence": "Where are your grandfather? — He is in the yard.",
        "matchLeft": "___ your mother?",
        "matchRight": "Where is"
      },
      {
        "id": "p1_l6_5",
        "lesson": 6,
        "ruleTag": "کار جمع در حال انجام",
        "sentence": "Ali and his father are fixing the bike in the garage.",
        "target": "are fixing",
        "cloze": "Ali and his father _____ the bike in the garage.",
        "promptHint": "plural V-ing",
        "options": [
          "are fixing",
          "is fixing",
          "fixing",
          "fixes"
        ],
        "fa": "علی و پدرش در پارکینگ مشغول تعمیر دوچرخه هستند.",
        "explainFa": "فاعل دو نفره «Ali and his father» جمع است و «are fixing» می‌گیرد.",
        "chunks": [
          "Ali and his father",
          "is fixing",
          "the bike",
          "in the garage."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are fixing",
        "flawedSentence": "Ali and his father is fixing the bike in the garage.",
        "matchLeft": "They ___ fixing it.",
        "matchRight": "are",
        "noTyping": true
      },
      {
        "id": "p1_l7_1",
        "lesson": 7,
        "ruleTag": "حرف اضافه ساعت at",
        "sentence": "Reza goes to school at seven fifteen every morning.",
        "target": "at",
        "cloze": "Reza goes to school _____ seven fifteen every morning.",
        "promptHint": "prep",
        "options": [
          "at",
          "in",
          "on",
          "to"
        ],
        "fa": "رضا هر روز صبح ساعت ۷:۱۵ به مدرسه می‌رود.",
        "explainFa": "قبل از ساعت دقیق همواره حرف اضافه «at» می‌آید.",
        "chunks": [
          "Reza goes",
          "to school",
          "in",
          "seven fifteen every morning."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "Reza goes to school in seven fifteen every morning.",
        "matchLeft": "___ 7:30 a.m.",
        "matchRight": "at",
        "noTyping": true
      },
      {
        "id": "p1_l7_2",
        "lesson": 7,
        "ruleTag": "پرسش ساعت",
        "sentence": "Excuse me, what time is the English class? — At 8:15.",
        "target": "what time",
        "cloze": "Excuse me, _____ is the English class? — At 8:15.",
        "promptHint": "Wh-",
        "options": [
          "what time",
          "what hour",
          "how many",
          "how time"
        ],
        "fa": "ببخشید، کلاس زبان انگلیسی چه ساعتی است؟ — ساعت ۸:۱۵.",
        "explainFa": "برای پرسیدن ساعت «what time» می‌آید. در فارسی «ساعت چند» می‌گوییم، برای همین گاهی اشتباهی «what hour» یا «how many» به کار می‌رود.",
        "chunks": [
          "Excuse me,",
          "what hour",
          "is the English class?",
          "— At 8:15."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "what time",
        "flawedSentence": "Excuse me, what hour is the English class? — At 8:15.",
        "matchLeft": "پرسش از ساعت دقیق",
        "matchRight": "What time",
        "noTyping": true
      },
      {
        "id": "p1_l7_3",
        "lesson": 7,
        "ruleTag": "خیابان بدون پلاک با on",
        "sentence": "Our school is on Hafez Street.",
        "target": "on",
        "cloze": "Our school is _____ Hafez Street.",
        "promptHint": "prep",
        "options": [
          "on",
          "at",
          "to",
          "into"
        ],
        "fa": "مدرسه ما در خیابان حافظ قرار دارد.",
        "explainFa": "قاعدهٔ دستوری: با نام خیابان «on» می‌آید (on Hafez Street)؛ «at» برای نشانیِ کامل با پلاک است (at 25 Hafez Street). نمونهٔ کتاب کار (ص ۵۶): «on Bahman Street».",
        "chunks": [
          "Our school",
          "is",
          "at",
          "Hafez Street."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "on",
        "flawedSentence": "Our school is at Hafez Street.",
        "matchLeft": "___ Azadi Street",
        "matchRight": "on",
        "noTyping": true
      },
      {
        "id": "p1_l7_4",
        "lesson": 7,
        "ruleTag": "نشانی با شماره پلاک at",
        "sentence": "We live at 24 Bahar Street.",
        "target": "at",
        "cloze": "We live _____ 24 Bahar Street.",
        "promptHint": "at + number",
        "options": [
          "at",
          "in",
          "on",
          "to"
        ],
        "fa": "ما در خیابان بهار، پلاک ۲۴ زندگی می‌کنیم.",
        "explainFa": "وقتی شماره پلاک قبل از نام خیابان بیاید، حرف اضافه «at» به کار می‌رود.",
        "chunks": [
          "We live",
          "in",
          "24 Bahar",
          "Street."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "at",
        "flawedSentence": "We live in 24 Bahar Street.",
        "matchLeft": "___ 24 Hafez St.",
        "matchRight": "at"
      },
      {
        "id": "p1_l7_5",
        "lesson": 7,
        "ruleTag": "پرسش شماره تلفن",
        "sentence": "What is your home phone number?",
        "target": "What",
        "cloze": "_____ is your home phone number?",
        "promptHint": "Wh-",
        "options": [
          "What",
          "How many",
          "How much",
          "Who"
        ],
        "fa": "شماره تلفن منزل شما چند است؟",
        "explainFa": "شماره تلفن را با «What» می‌پرسیم. در فارسی «شماره‌ات چند است؟» می‌گوییم، برای همین گاهی اشتباهی «How many» یا «How much» به کار می‌رود.",
        "chunks": [
          "How many",
          "is your",
          "home phone",
          "number?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "What",
        "flawedSentence": "How many is your home phone number?",
        "matchLeft": "___ is your phone number?",
        "matchRight": "What",
        "noTyping": true
      },
      {
        "id": "p1_l8_1",
        "lesson": 8,
        "ruleTag": "تعارف مؤدبانه Would you like",
        "sentence": "Would you like some orange juice?",
        "target": "some",
        "cloze": "Would you like _____ orange juice?",
        "promptHint": "some / an",
        "options": [
          "some",
          "an",
          "many",
          "a few"
        ],
        "fa": "کمی آب‌پرتقال میل دارید؟",
        "explainFa": "فراتر از کتاب — قاعدهٔ این درس: «orange juice» غیرقابل‌شمارش است و در تعارف «some» می‌گیرد: «some orange juice» (یا «a glass of orange juice»). «an orange juice» در مکالمه شنیده می‌شود، ولی جواب کتاب و امتحان «some» است.",
        "chunks": [
          "Would you",
          "like",
          "an",
          "orange juice?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "some",
        "flawedSentence": "Would you like an orange juice?",
        "matchLeft": "Would you like ___ tea?",
        "matchRight": "some"
      },
      {
        "id": "p1_l8_2",
        "lesson": 8,
        "ruleTag": "تطابق فعل با favorite food",
        "sentence": "My favorite food is rice and chicken.",
        "target": "is",
        "cloze": "My favorite food _____ rice and chicken.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "غذای مورد علاقه من چلو مرغ است.",
        "explainFa": "فاعل جمله «My favorite food» (مفرد) است، پس «is» می‌گیرد.",
        "chunks": [
          "My favorite",
          "food",
          "are",
          "rice and chicken."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My favorite food are rice and chicken.",
        "matchLeft": "My favorite drink ___ milk.",
        "matchRight": "is",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l8_3",
        "lesson": 8,
        "ruleTag": "پاسخ کوتاه تعارف",
        "sentence": "Would you like some dates? — Yes, please.",
        "target": "Would",
        "cloze": "_____ you like some dates? — Yes, please.",
        "promptHint": "modal",
        "options": [
          "Would",
          "Are",
          "Do",
          "Does"
        ],
        "fa": "کمی خرما میل دارید؟ — بله، لطفاً.",
        "explainFa": "فراتر از کتاب — ساختار تعارف مؤدبانه با «Would you like ...?» ساخته می‌شود.",
        "chunks": [
          "Are",
          "you like",
          "some dates? —",
          "Yes, please."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Would",
        "flawedSentence": "Are you like some dates? — Yes, please.",
        "matchLeft": "___ you like some cake?",
        "matchRight": "Would",
        "noTyping": true
      },
      {
        "id": "p1_l8_4",
        "lesson": 8,
        "ruleTag": "تشخیص گرسنگی و تشنگی",
        "sentence": "I am very thirsty; please give me a glass of water.",
        "target": "am",
        "cloze": "I _____ very thirsty; please give me a glass of water.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من خیلی تشنه‌ام؛ لطفاً یک لیوان آب به من بدهید.",
        "explainFa": "در زمان حال با فاعل «I» از «am» استفاده می‌کنیم: «I am thirsty». در فارسی نیز «تشنه‌ام» با فعل بودن بیان می‌شود.",
        "chunks": [
          "I",
          "is",
          "very thirsty; please give me",
          "a glass of water."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is very thirsty; please give me a glass of water.",
        "matchLeft": "نیاز به آب",
        "matchRight": "thirsty"
      },
      {
        "id": "p1_l8_5",
        "lesson": 8,
        "ruleTag": "علاقه غذایی با like",
        "sentence": "Do you like traditional Iranian soups such as Ash?",
        "target": "Do",
        "cloze": "_____ you like traditional Iranian soups such as Ash?",
        "promptHint": "Do / Are",
        "options": [
          "Do",
          "Are",
          "Does",
          "Is"
        ],
        "fa": "آیا سوپ‌های سنتی ایرانی مثل آش را دوست داری؟",
        "explainFa": "همراه فعل ساده «like» (بدون would) برای فاعل «you» فعل کمکی «Do» می‌آید.",
        "chunks": [
          "Are",
          "you like traditional",
          "Iranian soups",
          "such as Ash?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Do",
        "flawedSentence": "Are you like traditional Iranian soups such as Ash?",
        "matchLeft": "___ you like fish?",
        "matchRight": "Do",
        "altAnswers": [
          "Did"
        ]
      },
      {
        "id": "p1_l1_6",
        "lesson": 1,
        "ruleTag": "توافق فعل is با خواهر",
        "sentence": "My sister is a teacher.",
        "target": "is",
        "cloze": "My sister _____ a teacher.",
        "promptHint": "be",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "fa": "خواهرم معلم است.",
        "explainFa": "فاعل «My sister» سوم‌شخص مفرد است، پس «is» می‌گیرد نه «am».",
        "chunks": [
          "My",
          "sister",
          "am",
          "a teacher."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My sister am a teacher.",
        "matchLeft": "My sister",
        "matchRight": "is a teacher",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l1_7",
        "lesson": 1,
        "ruleTag": "توافق فعل are با ما",
        "sentence": "We are students in class two.",
        "target": "are",
        "cloze": "We _____ students in class two.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "ما دانش‌آموزان کلاس دو هستیم.",
        "explainFa": "فاعل «We» جمع است و «are» می‌گیرد.",
        "chunks": [
          "We",
          "is",
          "students in",
          "class two."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "We is students in class two.",
        "matchLeft": "We",
        "matchRight": "are students",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l1_8",
        "lesson": 1,
        "ruleTag": "اشاره مفرد نزدیک با this",
        "sentence": "This is my best friend.",
        "target": "This",
        "cloze": "_____ is my best friend.",
        "promptHint": "this",
        "options": [
          "This",
          "These",
          "Those",
          "They"
        ],
        "fa": "این بهترین دوست من است.",
        "explainFa": "«This» برای یک فرد یا چیز نزدیک به‌صورت مفرد به‌کار می‌رود.",
        "chunks": [
          "These",
          "is",
          "my",
          "best",
          "friend."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "This",
        "flawedSentence": "These is my best friend.",
        "matchLeft": "This",
        "matchRight": "is my best friend",
        "noTyping": true
      },
      {
        "id": "p1_l1_9",
        "lesson": 1,
        "ruleTag": "معرفی محل زندگی با am",
        "sentence": "I am from Mashhad.",
        "target": "am",
        "cloze": "I _____ from Mashhad.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من از مشهد هستم.",
        "explainFa": "در زمان حال، فعل بودن با «I» به شکل «am» می‌آید: «I am».",
        "chunks": [
          "I",
          "is",
          "from",
          "Mashhad."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is from Mashhad.",
        "matchLeft": "I",
        "matchRight": "am from Mashhad"
      },
      {
        "id": "p1_l1_10",
        "lesson": 1,
        "ruleTag": "مالکیت با your قبل از اسم",
        "sentence": "What is your father's name?",
        "target": "your",
        "cloze": "What is _____ father's name?",
        "promptHint": "your",
        "options": [
          "your",
          "you",
          "you're",
          "yours"
        ],
        "fa": "نام پدر شما چیست؟",
        "explainFa": "قبل از اسم («father's name») صفت ملکی «your» می‌آید، نه «you» یا «you're».",
        "chunks": [
          "What",
          "is",
          "you",
          "father's name?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "your",
        "flawedSentence": "What is you father's name?",
        "matchLeft": "What is",
        "matchRight": "your father's name",
        "noTyping": true
      },
      {
        "id": "p1_l1_11",
        "lesson": 1,
        "ruleTag": "تفاوت you و your پس از meet",
        "sentence": "It is nice to meet you again.",
        "target": "you",
        "cloze": "It is nice to meet _____ again.",
        "promptHint": "you",
        "options": [
          "you",
          "your",
          "yours",
          "you are"
        ],
        "fa": "خوشحالم که دوباره می‌بینمت.",
        "explainFa": "پس از «meet» ضمیر شخصی «you» لازم است، نه صفت ملکی «your».",
        "chunks": [
          "It is nice",
          "to meet",
          "your",
          "again."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "you",
        "flawedSentence": "It is nice to meet your again.",
        "matchLeft": "It is nice to meet",
        "matchRight": "you again",
        "noTyping": true
      },
      {
        "id": "p1_l1_12",
        "lesson": 1,
        "ruleTag": "احوال‌پرسی از والدین با are",
        "sentence": "How are your parents today?",
        "target": "are",
        "cloze": "How _____ your parents today?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "do"
        ],
        "fa": "پدر و مادرت امروز چطورند؟",
        "explainFa": "«your parents» جمع است، پس «are» می‌گیرد: «How are your parents?».",
        "chunks": [
          "How",
          "is",
          "your parents",
          "today?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "How is your parents today?",
        "matchLeft": "How",
        "matchRight": "are your parents today"
      },
      {
        "id": "p1_l1_13",
        "lesson": 1,
        "ruleTag": "معرفی دیگران با this",
        "sentence": "Mom, this is my classmate, Ali.",
        "target": "this",
        "cloze": "Mom, _____ is my classmate, Ali.",
        "promptHint": "this",
        "options": [
          "this",
          "these",
          "those",
          "they"
        ],
        "fa": "مامان، این هم‌کلاسی من، علی است.",
        "explainFa": "برای معرفی یک نفر به دیگری می‌گوییم «this is ...»؛ «these» برای چند نفر است.",
        "chunks": [
          "Mom,",
          "these",
          "is my",
          "classmate, Ali."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "this",
        "flawedSentence": "Mom, these is my classmate, Ali.",
        "matchLeft": "Mom, this is",
        "matchRight": "my classmate, Ali",
        "noTyping": true
      },
      {
        "id": "p1_l1_14",
        "lesson": 1,
        "ruleTag": "معرفی نام همراه با بیان سن",
        "sentence": "My name is Sara and I am twelve.",
        "target": "am",
        "cloze": "My name is Sara and I _____ twelve.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "have"
        ],
        "fa": "نام من سارا است و من دوازده ساله هستم.",
        "explainFa": "فاعل بخش دوم «I» است و در زمان حال «am» می‌گیرد، حتی وقتی پیش از آن «My name is» آمده است.",
        "chunks": [
          "My name is",
          "Sara and I",
          "is",
          "twelve."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "am",
        "flawedSentence": "My name is Sara and I is twelve.",
        "matchLeft": "I",
        "matchRight": "am twelve"
      },
      {
        "id": "p1_l1_15",
        "lesson": 1,
        "ruleTag": "توافق are با they",
        "sentence": "They are from our school.",
        "target": "are",
        "cloze": "They _____ from our school.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها از مدرسهٔ ما هستند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "from our",
          "school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is from our school.",
        "matchLeft": "They",
        "matchRight": "are from our school",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l2_6",
        "lesson": 2,
        "ruleTag": "پاسخ با ضمیر She برای دختر",
        "sentence": "Who is that tall girl? — She is my sister.",
        "target": "She",
        "cloze": "Who is that tall girl? — _____ is my sister.",
        "promptHint": "she",
        "options": [
          "She",
          "He",
          "Her",
          "It"
        ],
        "fa": "آن دختر قدبلند کیست؟ — او خواهر من است.",
        "explainFa": "برای «girl» ضمیر «She» به کار می‌رود؛ در فارسی فقط «او» داریم، برای همین گاهی اشتباهی «He» می‌گوییم.",
        "chunks": [
          "Who is that",
          "tall girl? —",
          "He",
          "is my sister."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "She",
        "flawedSentence": "Who is that tall girl? — He is my sister.",
        "matchLeft": "that tall girl",
        "matchRight": "She is my sister",
        "noTyping": true
      },
      {
        "id": "p1_l2_7",
        "lesson": 2,
        "ruleTag": "ضمیر فاعلی He برای پسر",
        "sentence": "He is my cousin. His name is Reza.",
        "target": "He",
        "cloze": "_____ is my cousin. His name is Reza.",
        "promptHint": "he",
        "options": [
          "He",
          "She",
          "His",
          "Him"
        ],
        "fa": "او پسرعموی من است. اسمش رضا است.",
        "explainFa": "چون بعدش «His name» آمده، فرد مذکر است و ضمیر فاعلی «He» لازم است.",
        "chunks": [
          "She",
          "is my",
          "cousin. His",
          "name is",
          "Reza."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "He",
        "flawedSentence": "She is my cousin. His name is Reza.",
        "matchLeft": "He is my cousin.",
        "matchRight": "His name is Reza.",
        "noTyping": true
      },
      {
        "id": "p1_l2_8",
        "lesson": 2,
        "ruleTag": "اشاره به فرد دور با that",
        "sentence": "That is my English teacher.",
        "target": "That",
        "cloze": "_____ is my English teacher.",
        "promptHint": "that",
        "options": [
          "That",
          "Those",
          "These",
          "They"
        ],
        "fa": "آن معلم انگلیسی من است.",
        "explainFa": "«That» برای فرد یا چیز دورتر به‌کار می‌رود.",
        "chunks": [
          "Those",
          "is",
          "my",
          "English",
          "teacher."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "That",
        "flawedSentence": "Those is my English teacher.",
        "matchLeft": "That",
        "matchRight": "is my English teacher",
        "noTyping": true
      },
      {
        "id": "p1_l2_9",
        "lesson": 2,
        "ruleTag": "ضمایر جمع they با are",
        "sentence": "They are my classmates.",
        "target": "are",
        "cloze": "They _____ my classmates.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها هم‌کلاسی‌های من هستند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "my",
          "classmates."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is my classmates.",
        "matchLeft": "They",
        "matchRight": "are my classmates",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l2_10",
        "lesson": 2,
        "ruleTag": "ساختار that girl در پرسش",
        "sentence": "Is that girl your sister?",
        "target": "that",
        "cloze": "Is _____ girl your sister?",
        "promptHint": "that",
        "options": [
          "that",
          "these",
          "those",
          "she"
        ],
        "fa": "آیا آن دختر خواهر توست؟",
        "explainFa": "اینجا «that girl» یعنی دختری که در پاسخ به آن اشاره شده است.",
        "chunks": [
          "Is",
          "these",
          "girl your",
          "sister?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "that",
        "flawedSentence": "Is these girl your sister?",
        "matchLeft": "Is",
        "matchRight": "that girl your sister",
        "noTyping": true
      },
      {
        "id": "p1_l2_11",
        "lesson": 2,
        "ruleTag": "ترکیب her name",
        "sentence": "Her name is Sara.",
        "target": "name",
        "cloze": "Her _____ is Sara.",
        "promptHint": "name (شکل درست)",
        "options": [
          "name",
          "names",
          "name's",
          "named"
        ],
        "fa": "نام او سارا است.",
        "explainFa": "«Her name» ترکیب صفت ملکی با اسم مفرد است.",
        "chunks": [
          "Her",
          "names",
          "is",
          "Sara."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "name",
        "flawedSentence": "Her names is Sara.",
        "matchLeft": "Her",
        "matchRight": "name is Sara"
      },
      {
        "id": "p1_l2_12",
        "lesson": 2,
        "ruleTag": "پرسش مکان درباره برادر",
        "sentence": "Where is your brother now?",
        "target": "is",
        "cloze": "Where _____ your brother now?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "do"
        ],
        "fa": "برادرت الان کجاست؟",
        "explainFa": "«your brother» مفرد است؛ پرسش مکان با «is» می‌آید.",
        "chunks": [
          "Where",
          "are",
          "your brother",
          "now?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Where are your brother now?",
        "matchLeft": "Where",
        "matchRight": "is your brother now"
      },
      {
        "id": "p1_l2_13",
        "lesson": 2,
        "ruleTag": "مالکیت Her به‌جای She",
        "sentence": "She is a good student. Her name is Maryam.",
        "target": "Her",
        "cloze": "She is a good student. _____ name is Maryam.",
        "promptHint": "her",
        "options": [
          "Her",
          "She",
          "His",
          "Hers"
        ],
        "fa": "او دانش‌آموز خوبی است. اسمش مریم است.",
        "explainFa": "قبل از اسم («name») صفت ملکی «Her» می‌آید، نه ضمیر فاعلی «She».",
        "chunks": [
          "She is a",
          "good student.",
          "She",
          "name is Maryam."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "Her",
        "flawedSentence": "She is a good student. She name is Maryam.",
        "matchLeft": "She is a good student.",
        "matchRight": "Her name is Maryam.",
        "noTyping": true
      },
      {
        "id": "p1_l2_14",
        "lesson": 2,
        "ruleTag": "پرسش نام درباره دختر",
        "sentence": "What is her name?",
        "target": "is",
        "cloze": "What _____ her name?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "do"
        ],
        "fa": "نام او چیست؟",
        "explainFa": "«her name» مفرد است، پس «is» می‌گیرد.",
        "chunks": [
          "What",
          "are",
          "her",
          "name?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "What are her name?",
        "matchLeft": "What",
        "matchRight": "is her name",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l2_15",
        "lesson": 2,
        "ruleTag": "اشاره جمع با those",
        "sentence": "Those boys over there are my classmates.",
        "target": "Those",
        "cloze": "_____ boys over there are my classmates.",
        "promptHint": "those",
        "options": [
          "Those",
          "This",
          "These",
          "They"
        ],
        "fa": "آن پسرهایی که آنجا هستند هم‌کلاسی‌های من هستند.",
        "explainFa": "«over there» یعنی دور؛ برای چند نفرِ دور «Those» می‌آید، نه «These» یا «This».",
        "chunks": [
          "This",
          "boys over",
          "there are",
          "my",
          "classmates."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Those",
        "flawedSentence": "This boys over there are my classmates.",
        "matchLeft": "Those",
        "matchRight": "boys over there are my classmates",
        "noTyping": true
      },
      {
        "id": "p1_l3_6",
        "lesson": 3,
        "ruleTag": "سن با am نه have",
        "sentence": "I am fourteen years old.",
        "target": "am",
        "cloze": "I _____ fourteen years old.",
        "promptHint": "be",
        "options": [
          "am",
          "have",
          "is",
          "are"
        ],
        "fa": "من چهارده ساله هستم.",
        "explainFa": "برای بیان سن از «am» استفاده می‌کنیم، نه «have».",
        "chunks": [
          "I",
          "have",
          "fourteen years",
          "old."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I have fourteen years old.",
        "matchLeft": "I",
        "matchRight": "am fourteen years old"
      },
      {
        "id": "p1_l3_7",
        "lesson": 3,
        "ruleTag": "پرسش سن درباره برادر",
        "sentence": "How old is your brother? — He is ten.",
        "target": "How",
        "cloze": "_____ old is your brother? — He is ten.",
        "promptHint": "how",
        "options": [
          "How",
          "What",
          "Who",
          "When"
        ],
        "fa": "برادرت چند ساله است؟ — او ده ساله است.",
        "explainFa": "برای پرسیدن سن همیشه «How old» به کار می‌رود؛ «What old» غلط است.",
        "chunks": [
          "What",
          "old is",
          "your brother?",
          "— He",
          "is ten."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How",
        "flawedSentence": "What old is your brother? — He is ten.",
        "matchLeft": "How old",
        "matchRight": "is your brother?",
        "noTyping": true
      },
      {
        "id": "p1_l3_8",
        "lesson": 3,
        "ruleTag": "ماه تولد با in",
        "sentence": "My birthday is in Shahrivar.",
        "target": "in",
        "cloze": "My birthday is _____ Shahrivar.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "on",
          "at",
          "to"
        ],
        "fa": "تولد من در شهریور است.",
        "explainFa": "قبل از نام ماه حرف اضافهٔ «in» می‌آید: «in Shahrivar».",
        "chunks": [
          "My birthday",
          "is",
          "on",
          "Shahrivar."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My birthday is on Shahrivar.",
        "matchLeft": "My birthday is",
        "matchRight": "in Shahrivar"
      },
      {
        "id": "p1_l3_9",
        "lesson": 3,
        "ruleTag": "گروه سنی با are",
        "sentence": "We are students in grade seven.",
        "target": "are",
        "cloze": "We _____ students in grade seven.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "ما دانش‌آموزان پایه هفتم هستیم.",
        "explainFa": "«We» جمع است و «are» می‌گیرد.",
        "chunks": [
          "We",
          "is",
          "students in",
          "grade seven."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "We is students in grade seven.",
        "matchLeft": "We",
        "matchRight": "are students",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l3_10",
        "lesson": 3,
        "ruleTag": "سن دختر با is",
        "sentence": "She is ten years old now.",
        "target": "is",
        "cloze": "She _____ ten years old now.",
        "promptHint": "be",
        "options": [
          "is",
          "am",
          "are",
          "have"
        ],
        "fa": "او الان ده ساله است.",
        "explainFa": "«She» مفرد است؛ «am» با «I» می‌آید و «have» برای سن به‌کار نمی‌رود.",
        "chunks": [
          "She",
          "am",
          "ten years",
          "old now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "She am ten years old now.",
        "matchLeft": "She",
        "matchRight": "is ten years old now"
      },
      {
        "id": "p1_l3_11",
        "lesson": 3,
        "ruleTag": "پرسش زمان تولد خواهر",
        "sentence": "When is your sister's birthday? — It is in Aban.",
        "target": "When",
        "cloze": "_____ is your sister's birthday? — It is in Aban.",
        "promptHint": "when",
        "options": [
          "When",
          "Where",
          "Who",
          "How old"
        ],
        "fa": "تولد خواهرت کی است؟ — در آبان است.",
        "explainFa": "پاسخ «in Aban» یک زمان است، پس سؤال با «When» شروع می‌شود.",
        "chunks": [
          "Where",
          "is your sister's",
          "birthday? —",
          "It is",
          "in Aban."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "When",
        "flawedSentence": "Where is your sister's birthday? — It is in Aban.",
        "matchLeft": "When is",
        "matchRight": "your sister's birthday?",
        "noTyping": true
      },
      {
        "id": "p1_l3_12",
        "lesson": 3,
        "ruleTag": "جمع اسم years در بیان سن",
        "sentence": "My father is forty-five years old.",
        "target": "years",
        "cloze": "My father is forty-five _____ old.",
        "promptHint": "year",
        "options": [
          "years",
          "year",
          "year's",
          "years'"
        ],
        "fa": "پدرم چهل و پنج ساله است.",
        "explainFa": "بعد از عدد بیشتر از یک، «years» جمع می‌آید: «forty-five years old».",
        "chunks": [
          "My father",
          "is forty-five",
          "year",
          "old."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "years",
        "flawedSentence": "My father is forty-five year old.",
        "matchLeft": "forty-five",
        "matchRight": "years old"
      },
      {
        "id": "p1_l3_13",
        "lesson": 3,
        "ruleTag": "تعلق their با اسم مفرد",
        "sentence": "Their birthday is in Esfand.",
        "target": "birthday",
        "cloze": "Their _____ is in Esfand.",
        "promptHint": "birthday (شکل درست)",
        "options": [
          "birthday",
          "birthdays",
          "birthday's",
          "birth day"
        ],
        "fa": "تولد آن‌ها در اسفند است.",
        "explainFa": "«Their» با اسم مفرد مثل «birthday» به‌کار می‌رود.",
        "chunks": [
          "Their",
          "birthdays",
          "is in",
          "Esfand."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "birthday",
        "flawedSentence": "Their birthdays is in Esfand.",
        "matchLeft": "Their",
        "matchRight": "birthday is in Esfand"
      },
      {
        "id": "p1_l3_14",
        "lesson": 3,
        "ruleTag": "روز تولد با my",
        "sentence": "My birthday is on the first of Farvardin.",
        "target": "birthday",
        "cloze": "My _____ is on the first of Farvardin.",
        "promptHint": "birthday (شکل درست)",
        "options": [
          "birthday",
          "birthdays",
          "birthday's",
          "birth day"
        ],
        "fa": "تولد من اول فروردین است.",
        "explainFa": "با «My» اسم مفرد مثل «birthday» به‌کار می‌رود.",
        "chunks": [
          "My",
          "birthdays",
          "is on the",
          "first of Farvardin."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "birthday",
        "flawedSentence": "My birthdays is on the first of Farvardin.",
        "matchLeft": "My",
        "matchRight": "birthday is on the first of Farvardin"
      },
      {
        "id": "p1_l3_15",
        "lesson": 3,
        "ruleTag": "سن والدین با are",
        "sentence": "How old are your parents?",
        "target": "are",
        "cloze": "How old _____ your parents?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "have"
        ],
        "fa": "پدر و مادرت چند ساله هستند؟",
        "explainFa": "«your parents» جمع است، پس «are» می‌گیرد.",
        "chunks": [
          "How",
          "old",
          "is",
          "your parents?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "are",
        "flawedSentence": "How old is your parents?",
        "matchLeft": "How old",
        "matchRight": "are your parents",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l4_6",
        "lesson": 4,
        "ruleTag": "an قبل از English",
        "sentence": "My aunt is an English teacher.",
        "target": "an",
        "cloze": "My aunt is _____ English teacher.",
        "promptHint": "a / an",
        "options": [
          "an",
          "a",
          "some",
          "one"
        ],
        "fa": "خاله‌ام معلم زبان انگلیسی است.",
        "explainFa": "کلمهٔ بعدی «English» با صدای مصوت شروع می‌شود، پس «an» می‌آید: «an English teacher».",
        "chunks": [
          "My aunt",
          "is",
          "a",
          "English teacher."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "an",
        "flawedSentence": "My aunt is a English teacher.",
        "matchLeft": "an",
        "matchRight": "English teacher"
      },
      {
        "id": "p1_l4_7",
        "lesson": 4,
        "ruleTag": "شغل جمع با are",
        "sentence": "They are farmers in this village.",
        "target": "are",
        "cloze": "They _____ farmers in this village.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها کشاورز این روستا هستند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "farmers in",
          "this village."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is farmers in this village.",
        "matchLeft": "They",
        "matchRight": "are farmers",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l4_8",
        "lesson": 4,
        "ruleTag": "مالکیت 's در شغل مادر",
        "sentence": "What is your mother's job?",
        "target": "mother's",
        "cloze": "What is your _____ job?",
        "promptHint": "'s",
        "options": [
          "mother's",
          "mother",
          "mothers",
          "mother is"
        ],
        "fa": "شغل مادرت چیست؟",
        "explainFa": "برای مالکیت بعد از اسم «'s» می‌آید: «your mother's job» یعنی شغلِ مادرت.",
        "chunks": [
          "What is",
          "your",
          "mother",
          "job?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "mother's",
        "flawedSentence": "What is your mother job?",
        "matchLeft": "your mother's",
        "matchRight": "job",
        "noTyping": true
      },
      {
        "id": "p1_l4_9",
        "lesson": 4,
        "ruleTag": "شغل با an و is",
        "sentence": "He is an actor in our city.",
        "target": "is",
        "cloze": "He _____ an actor in our city.",
        "promptHint": "be",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "fa": "او بازیگر شهر ما است.",
        "explainFa": "«He» سوم‌شخص مفرد است و «is» می‌گیرد.",
        "chunks": [
          "He",
          "am",
          "an actor in",
          "our city."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "He am an actor in our city.",
        "matchLeft": "He",
        "matchRight": "is an actor",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l4_10",
        "lesson": 4,
        "ruleTag": "شغل با a",
        "sentence": "My father is a driver.",
        "target": "is",
        "cloze": "My father _____ a driver.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "پدرم راننده است.",
        "explainFa": "«My father» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "My",
          "father",
          "are",
          "a driver."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My father are a driver.",
        "matchLeft": "My father",
        "matchRight": "is a driver",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l4_11",
        "lesson": 4,
        "ruleTag": "معرفی شغل با am",
        "sentence": "I am a student in this school.",
        "target": "am",
        "cloze": "I _____ a student in this school.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من دانش‌آموز این مدرسه هستم.",
        "explainFa": "در زمان حال، فعل بودن با «I» به شکل «am» می‌آید.",
        "chunks": [
          "I",
          "is",
          "a student in",
          "this school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is a student in this school.",
        "matchLeft": "I",
        "matchRight": "am a student"
      },
      {
        "id": "p1_l4_12",
        "lesson": 4,
        "ruleTag": "پرسش شغل با does",
        "sentence": "What does your father do?",
        "target": "does",
        "cloze": "What _____ your father do?",
        "promptHint": "do",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "پدرت چه کار می‌کند؟",
        "explainFa": "برای پرسیدن شغل با الگوی «What ... do» از «does» استفاده می‌کنیم.",
        "chunks": [
          "What",
          "do",
          "your father",
          "do?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "What do your father do?",
        "matchLeft": "What",
        "matchRight": "does your father do"
      },
      {
        "id": "p1_l4_13",
        "lesson": 4,
        "ruleTag": "نسبت خانوادگی با آپاستروف",
        "sentence": "She is my aunt's teacher.",
        "target": "aunt's",
        "cloze": "She is my _____ teacher.",
        "promptHint": "'s",
        "options": [
          "aunt's",
          "aunt",
          "aunts",
          "aunt is"
        ],
        "fa": "او معلم خالهٔ من است.",
        "explainFa": "«my aunt's teacher» یعنی معلمِ خاله‌ام؛ مالکیت با «'s» نشان داده می‌شود.",
        "chunks": [
          "She is",
          "my",
          "aunt",
          "teacher."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "aunt's",
        "flawedSentence": "She is my aunt teacher.",
        "matchLeft": "my aunt's",
        "matchRight": "teacher",
        "noTyping": true
      },
      {
        "id": "p1_l4_14",
        "lesson": 4,
        "ruleTag": "مالکیت با 's برای برادر",
        "sentence": "This is my brother's new bicycle.",
        "target": "brother's",
        "cloze": "This is my _____ new bicycle.",
        "promptHint": "'s",
        "options": [
          "brother's",
          "brother",
          "brothers",
          "brother is"
        ],
        "fa": "این دوچرخهٔ جدید برادرم است.",
        "explainFa": "«my brother's bicycle» یعنی دوچرخهٔ برادرم؛ بدون «'s» معنای مالکیت از بین می‌رود.",
        "chunks": [
          "This is",
          "my",
          "brother",
          "new bicycle."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "brother's",
        "flawedSentence": "This is my brother new bicycle.",
        "matchLeft": "my brother's",
        "matchRight": "new bicycle",
        "noTyping": true
      },
      {
        "id": "p1_l4_15",
        "lesson": 4,
        "ruleTag": "اسم جمع با my",
        "sentence": "My parents work in a hospital.",
        "target": "parents",
        "cloze": "My _____ work in a hospital.",
        "promptHint": "parent",
        "options": [
          "parents",
          "parent",
          "parent's",
          "parent is"
        ],
        "fa": "والدین من در بیمارستان کار می‌کنند.",
        "explainFa": "اسم جمع «parents» با «My» و فعل جمع به‌کار می‌رود.",
        "chunks": [
          "My",
          "parent",
          "work in",
          "a hospital."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "parents",
        "flawedSentence": "My parent work in a hospital.",
        "matchLeft": "My",
        "matchRight": "parents work in a hospital"
      },
      {
        "id": "p1_l5_6",
        "lesson": 5,
        "ruleTag": "داشتن مو با has",
        "sentence": "My sister has long black hair.",
        "target": "has",
        "cloze": "My sister _____ long black hair.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "are"
        ],
        "fa": "خواهرم موی بلند مشکی دارد.",
        "explainFa": "فراتر از کتاب — برای داشتن مو از «has» استفاده می‌کنیم، نه «is».",
        "chunks": [
          "My sister",
          "is",
          "long black",
          "hair."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "My sister is long black hair.",
        "matchLeft": "My sister",
        "matchRight": "has long black hair",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_7",
        "lesson": 5,
        "ruleTag": "داشتن چشم با has",
        "sentence": "He has blue eyes.",
        "target": "has",
        "cloze": "He _____ blue eyes.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "am"
        ],
        "fa": "او چشم‌های آبی دارد.",
        "explainFa": "فراتر از کتاب — «He» سوم‌شخص مفرد است، پس «has» می‌گیرد.",
        "chunks": [
          "He",
          "is",
          "blue",
          "eyes."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "He is blue eyes.",
        "matchLeft": "He",
        "matchRight": "has blue eyes",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_8",
        "lesson": 5,
        "ruleTag": "موی جمع با have",
        "sentence": "They have short black hair.",
        "target": "have",
        "cloze": "They _____ short black hair.",
        "promptHint": "have (شکل درست)",
        "options": [
          "have",
          "has",
          "is",
          "are"
        ],
        "fa": "آن‌ها موی کوتاه مشکی دارند.",
        "explainFa": "فراتر از کتاب — «They» جمع است، پس «have» می‌گیرد.",
        "chunks": [
          "They",
          "has",
          "short black",
          "hair."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have",
        "flawedSentence": "They has short black hair.",
        "matchLeft": "They",
        "matchRight": "have short black hair",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_9",
        "lesson": 5,
        "ruleTag": "ویژگی کلی با is",
        "sentence": "My teacher is very tall.",
        "target": "is",
        "cloze": "My teacher _____ very tall.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "is a",
          "be"
        ],
        "fa": "معلم من خیلی قدبلند است.",
        "explainFa": "«tall» صفت است و بعد از «is» بدون «a» می‌آید: «My teacher is very tall». «a» فقط قبل از اسم می‌آید: «a tall man».",
        "chunks": [
          "My",
          "teacher",
          "is a",
          "very tall."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My teacher is a very tall.",
        "matchLeft": "My teacher",
        "matchRight": "is very tall",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l5_10",
        "lesson": 5,
        "ruleTag": "پرسش رنگ با is",
        "sentence": "What color is her hair?",
        "target": "is",
        "cloze": "What color _____ her hair?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "does",
          "be"
        ],
        "fa": "رنگ موی او چیست؟",
        "explainFa": "فراتر از کتاب — «hair» در انگلیسی غیرقابل‌شمارش و مفرد است، پس «is» می‌گیرد؛ در فارسی «موها» جمع است و برای همین گاهی اشتباهی «are» می‌گوییم.",
        "chunks": [
          "What",
          "color",
          "are",
          "her hair?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "What color are her hair?",
        "matchLeft": "What color",
        "matchRight": "is her hair",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l5_11",
        "lesson": 5,
        "ruleTag": "پوشیدن با is wearing",
        "sentence": "The boy is wearing a red shirt today.",
        "target": "is wearing",
        "cloze": "The boy _____ a red shirt today.",
        "promptHint": "wear",
        "options": [
          "is wearing",
          "wears",
          "wearing",
          "is wear"
        ],
        "fa": "آن پسر امروز یک پیراهن قرمز می‌پوشد.",
        "explainFa": "برای پوشیدن در حال حاضر «is wearing» به‌کار می‌رود.",
        "chunks": [
          "The boy",
          "wears",
          "a red",
          "shirt today."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is wearing",
        "flawedSentence": "The boy wears a red shirt today.",
        "matchLeft": "The boy",
        "matchRight": "is wearing a red shirt"
      },
      {
        "id": "p1_l5_12",
        "lesson": 5,
        "ruleTag": "داشتن لبخند با has",
        "sentence": "She has a beautiful smile.",
        "target": "has",
        "cloze": "She _____ a beautiful smile.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "are"
        ],
        "fa": "او لبخندی زیبا دارد.",
        "explainFa": "فراتر از کتاب — برای داشتن ویژگی بدنی از «has» استفاده می‌کنیم.",
        "chunks": [
          "She",
          "is",
          "a beautiful",
          "smile."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "She is a beautiful smile.",
        "matchLeft": "She",
        "matchRight": "has a beautiful smile",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_13",
        "lesson": 5,
        "ruleTag": "داشتن ریش با has",
        "sentence": "My uncle has a long gray beard.",
        "target": "has",
        "cloze": "My uncle _____ a long gray beard.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "is having"
        ],
        "fa": "عمویم ریش بلند خاکستری دارد.",
        "explainFa": "فراتر از کتاب — برای داشتن ویژگی ظاهری مثل ریش از «has» استفاده می‌کنیم، نه «is».",
        "chunks": [
          "My uncle",
          "is",
          "a long",
          "gray beard."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "My uncle is a long gray beard.",
        "matchLeft": "My uncle",
        "matchRight": "has a long gray beard",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_14",
        "lesson": 5,
        "ruleTag": "موی فر با has",
        "sentence": "My little brother has curly brown hair.",
        "target": "has",
        "cloze": "My little brother _____ curly brown hair.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "are"
        ],
        "fa": "برادر کوچکم موی فر قهوه‌ای دارد.",
        "explainFa": "فراتر از کتاب — «has» برای داشتن موی فر درست است.",
        "chunks": [
          "My little",
          "brother",
          "is",
          "curly brown hair."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "has",
        "flawedSentence": "My little brother is curly brown hair.",
        "matchLeft": "My little brother",
        "matchRight": "has curly brown hair",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_15",
        "lesson": 5,
        "ruleTag": "صفت برای چشم با has",
        "sentence": "She has very beautiful eyes.",
        "target": "has",
        "cloze": "She _____ very beautiful eyes.",
        "promptHint": "have",
        "options": [
          "has",
          "is",
          "have",
          "are"
        ],
        "fa": "او چشم‌های بسیار زیبایی دارد.",
        "explainFa": "فراتر از کتاب — با «She» فعل «has» درست است.",
        "chunks": [
          "She",
          "is",
          "very beautiful",
          "eyes."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "She is very beautiful eyes.",
        "matchLeft": "She",
        "matchRight": "has very beautiful eyes",
        "altAnswers": [
          "had"
        ]
      },
      {
        "id": "p1_l5_16",
        "lesson": 5,
        "ruleTag": "پوشیدن لباس با is wearing (He's)",
        "sentence": "Which one is your teacher? — He's the tall man. He's wearing a gray suit.",
        "target": "wearing",
        "cloze": "Which one is your teacher? — He's the tall man. He's _____ a gray suit.",
        "promptHint": "wear",
        "options": [
          "wearing",
          "wear",
          "wears",
          "wore"
        ],
        "fa": "کدام‌یک معلم توست؟ — همان مرد قدبلند. کت‌وشلوار خاکستری پوشیده است.",
        "explainFa": "کتاب (ص ۲۹): برای لباسی که الان بر تن کسی است «He's / She's wearing …» می‌گوییم؛ بعد از «He's» شکل ing می‌آید.",
        "chunks": [
          "Which one is your teacher? —",
          "He's the tall man. He's",
          "wear",
          "a gray suit."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "wearing",
        "flawedSentence": "Which one is your teacher? — He's the tall man. He's wear a gray suit.",
        "matchLeft": "He's ___ a gray suit",
        "matchRight": "wearing"
      },
      {
        "id": "p1_l5_17",
        "lesson": 5,
        "ruleTag": "معرفی فرد با She's (to be)",
        "sentence": "Which one is Dorna? — She's the young girl. She's wearing a gray scarf.",
        "target": "She's",
        "cloze": "Which one is Dorna? — _____ the young girl. She's wearing a gray scarf.",
        "promptHint": "she",
        "options": [
          "She's",
          "She",
          "Her",
          "Hers"
        ],
        "fa": "کدام‌یک درنا است؟ — همان دختر جوان. روسری خاکستری پوشیده است.",
        "explainFa": "کتاب (ص ۲۹: «She's the young girl»): «She's» شکل کوتاهِ «She is» است؛ بدون فعل to be جمله ناقص می‌ماند.",
        "chunks": [
          "Which one is Dorna? —",
          "She",
          "the young girl. She's",
          "wearing a gray scarf."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "She's",
        "flawedSentence": "Which one is Dorna? — She the young girl. She's wearing a gray scarf.",
        "matchLeft": "___ the young girl",
        "matchRight": "She's"
      },
      {
        "id": "p1_l5_18",
        "lesson": 5,
        "ruleTag": "پرسش Which one برای انتخاب فرد",
        "sentence": "Which one is your father? — He's the old man.",
        "target": "Which",
        "cloze": "_____ one is your father? — He's the old man.",
        "promptHint": "which",
        "options": [
          "Which",
          "What",
          "Who",
          "Where"
        ],
        "fa": "کدام‌یک پدر توست؟ — همان مرد مسن.",
        "explainFa": "کتاب (ص ۲۹): برای انتخاب یک نفر از میان چند نفرِ دیده‌شده «Which one …?» می‌پرسیم.",
        "chunks": [
          "What",
          "one is your",
          "father? —",
          "He's the",
          "old man."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Which",
        "flawedSentence": "What one is your father? — He's the old man.",
        "matchLeft": "___ one is your father?",
        "matchRight": "Which",
        "noTyping": true
      },
      {
        "id": "p1_l6_6",
        "lesson": 6,
        "ruleTag": "پرسش مکان درباره مادر",
        "sentence": "Where is your mother now? — She is in the kitchen.",
        "target": "Where",
        "cloze": "_____ is your mother now? — She is in the kitchen.",
        "promptHint": "where",
        "options": [
          "Where",
          "What",
          "Who",
          "When"
        ],
        "fa": "مادرت الان کجاست؟ — او در آشپزخانه است.",
        "explainFa": "پاسخ «in the kitchen» یک مکان است، پس سؤال با «Where» شروع می‌شود.",
        "chunks": [
          "What",
          "is your mother",
          "now? — She",
          "is in",
          "the kitchen."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Where",
        "flawedSentence": "What is your mother now? — She is in the kitchen.",
        "matchLeft": "Where is",
        "matchRight": "your mother now?",
        "noTyping": true
      },
      {
        "id": "p1_l6_7",
        "lesson": 6,
        "ruleTag": "بازی گروهی با are",
        "sentence": "The children are playing in the garden.",
        "target": "are",
        "cloze": "The children _____ playing in the garden.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "بچه‌ها در باغ بازی می‌کنند.",
        "explainFa": "«The children» جمع است و «are» می‌گیرد.",
        "chunks": [
          "The children",
          "is",
          "playing in",
          "the garden."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "The children is playing in the garden.",
        "matchLeft": "The children",
        "matchRight": "are playing in the garden",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l6_8",
        "lesson": 6,
        "ruleTag": "خواندن با am",
        "sentence": "I am reading a storybook now.",
        "target": "am",
        "cloze": "I _____ reading a storybook now.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من الان یک کتاب داستانی می‌خوانم.",
        "explainFa": "«I» با «am» می‌آید.",
        "chunks": [
          "I",
          "is",
          "reading a",
          "storybook now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is reading a storybook now.",
        "matchLeft": "I",
        "matchRight": "am reading a storybook"
      },
      {
        "id": "p1_l6_9",
        "lesson": 6,
        "ruleTag": "حال استمراری: فعل ing دار پس از is",
        "sentence": "She is cooking in the kitchen.",
        "target": "cooking",
        "cloze": "She is _____ in the kitchen.",
        "promptHint": "cook",
        "options": [
          "cooking",
          "cook",
          "cooks",
          "cooked"
        ],
        "fa": "او در آشپزخانه آشپزی می‌کند.",
        "explainFa": "بعد از «is» برای کاری که همین الان انجام می‌شود، فعل «ing»دار می‌آید: «is cooking».",
        "chunks": [
          "She is",
          "cook",
          "in the",
          "kitchen."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "cooking",
        "flawedSentence": "She is cook in the kitchen.",
        "matchLeft": "She is",
        "matchRight": "cooking"
      },
      {
        "id": "p1_l6_10",
        "lesson": 6,
        "ruleTag": "پرسش کار در حال انجام مفرد",
        "sentence": "What is your brother doing?",
        "target": "is",
        "cloze": "What _____ your brother doing?",
        "promptHint": "do",
        "options": [
          "is",
          "are",
          "am",
          "does"
        ],
        "fa": "برادرت چه کار می‌کند؟",
        "explainFa": "«your brother» مفرد است، پس «is» می‌گیرد.",
        "chunks": [
          "What",
          "are",
          "your brother",
          "doing?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "What are your brother doing?",
        "matchLeft": "What",
        "matchRight": "is your brother doing",
        "noTyping": true
      },
      {
        "id": "p1_l6_11",
        "lesson": 6,
        "ruleTag": "تماشای فیلم با are",
        "sentence": "They are watching a film at home.",
        "target": "are",
        "cloze": "They _____ watching a film at home.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها در خانه فیلم می‌بینند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "watching a film",
          "at home."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is watching a film at home.",
        "matchLeft": "They",
        "matchRight": "are watching a film",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l6_12",
        "lesson": 6,
        "ruleTag": "حال استمراری با is + washing",
        "sentence": "My father is washing the car.",
        "target": "washing",
        "cloze": "My father is _____ the car.",
        "promptHint": "wash",
        "options": [
          "washing",
          "wash",
          "washes",
          "washed"
        ],
        "fa": "پدرم دارد ماشین را می‌شوید.",
        "explainFa": "ساختار حال استمراری «is + فعل ing» است: «is washing»؛ «is wash» غلط است.",
        "chunks": [
          "My father",
          "is",
          "wash",
          "the car."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "washing",
        "flawedSentence": "My father is wash the car.",
        "matchLeft": "My father is",
        "matchRight": "washing the car"
      },
      {
        "id": "p1_l6_13",
        "lesson": 6,
        "ruleTag": "انجام تکالیف با are",
        "sentence": "We are doing our homework now.",
        "target": "are",
        "cloze": "We _____ doing our homework now.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "ما الان مشغول انجام تکالیفمان هستیم.",
        "explainFa": "«We» جمع است و «are» می‌گیرد.",
        "chunks": [
          "We",
          "is",
          "doing our",
          "homework now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "We is doing our homework now.",
        "matchLeft": "We",
        "matchRight": "are doing our homework"
      },
      {
        "id": "p1_l6_14",
        "lesson": 6,
        "ruleTag": "پرسش مکان بازی",
        "sentence": "Where are they playing football?",
        "target": "are",
        "cloze": "Where _____ they playing football?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "do"
        ],
        "fa": "آن‌ها کجا فوتبال بازی می‌کنند؟",
        "explainFa": "«they» جمع است، پس «are» می‌گیرد.",
        "chunks": [
          "Where",
          "is",
          "they playing",
          "football?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "Where is they playing football?",
        "matchLeft": "Where",
        "matchRight": "are they playing football",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l6_15",
        "lesson": 6,
        "ruleTag": "حرف اضافه in برای داخل اتاق",
        "sentence": "My brother is taking a shower in the bathroom.",
        "target": "in",
        "cloze": "My brother is taking a shower _____ the bathroom.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "on",
          "at",
          "into"
        ],
        "fa": "برادرم در حمام دارد دوش می‌گیرد.",
        "explainFa": "برای داخل یک اتاق از «in» استفاده می‌کنیم: «in the bathroom».",
        "chunks": [
          "My brother is",
          "taking a shower",
          "on",
          "the bathroom."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My brother is taking a shower on the bathroom.",
        "matchLeft": "taking a shower",
        "matchRight": "in the bathroom"
      },
      {
        "id": "p1_l7_6",
        "lesson": 7,
        "ruleTag": "آدرس پلاک‌دار با at",
        "sentence": "My uncle lives at 15 Baker Street.",
        "target": "at",
        "cloze": "My uncle lives _____ 15 Baker Street.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "on",
          "in",
          "to"
        ],
        "fa": "عمویم در خیابان بیکر شمارهٔ ۱۵ زندگی می‌کند.",
        "explainFa": "آدرس دارای شمارهٔ پلاک با «at» می‌آید.",
        "chunks": [
          "My uncle",
          "lives",
          "on",
          "15 Baker Street."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "My uncle lives on 15 Baker Street.",
        "matchLeft": "My uncle",
        "matchRight": "lives at 15 Baker Street"
      },
      {
        "id": "p1_l7_7",
        "lesson": 7,
        "ruleTag": "ساعت با at نه in",
        "sentence": "The shop opens at nine in the morning.",
        "target": "at",
        "cloze": "The shop opens _____ nine in the morning.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "to"
        ],
        "fa": "فروشگاه ساعت ۹ صبح باز می‌شود.",
        "explainFa": "قبل از ساعت دقیق «at» می‌آید، نه «in».",
        "chunks": [
          "The shop opens",
          "in",
          "nine in",
          "the morning."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "at",
        "flawedSentence": "The shop opens in nine in the morning.",
        "matchLeft": "The shop",
        "matchRight": "opens at nine"
      },
      {
        "id": "p1_l7_8",
        "lesson": 7,
        "ruleTag": "پرسش ساعت با does",
        "sentence": "What time does the school bus come?",
        "target": "does",
        "cloze": "What time _____ the school bus come?",
        "promptHint": "do",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "اتوبوس مدرسه ساعت چند می‌آید؟",
        "explainFa": "برای سوم‌شخص مفرد «the bus» از «does» استفاده می‌کنیم.",
        "chunks": [
          "What time",
          "do",
          "the school",
          "bus come?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "What time do the school bus come?",
        "matchLeft": "What time",
        "matchRight": "does the school bus come",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p1_l7_9",
        "lesson": 7,
        "ruleTag": "شماره تلفن با is",
        "sentence": "My home phone number is 555-1234.",
        "target": "is",
        "cloze": "My home phone number _____ 555-1234.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "شمارهٔ تلفن خانه‌ام ۵۵۵-۱۲۳۴ است.",
        "explainFa": "«My home phone number» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "My home",
          "phone number",
          "are",
          "555-1234."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My home phone number are 555-1234.",
        "matchLeft": "My home phone number",
        "matchRight": "is 555-1234",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l7_10",
        "lesson": 7,
        "ruleTag": "وقت ناهار با at",
        "sentence": "We have lunch at twelve o'clock.",
        "target": "at",
        "cloze": "We have lunch _____ twelve o'clock.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "for"
        ],
        "fa": "ما ساعت ۱۲ ظهر ناهار می‌خوریم.",
        "explainFa": "قبل از ساعت دقیق «at» می‌آید.",
        "chunks": [
          "We have",
          "lunch",
          "in",
          "twelve o'clock."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "We have lunch in twelve o'clock.",
        "matchLeft": "We",
        "matchRight": "have lunch at twelve o'clock"
      },
      {
        "id": "p1_l7_11",
        "lesson": 7,
        "ruleTag": "پرسش محل زندگی با do",
        "sentence": "Where do you live now?",
        "target": "do",
        "cloze": "Where _____ you live now?",
        "promptHint": "do (شکل درست)",
        "options": [
          "do",
          "does",
          "is",
          "are"
        ],
        "fa": "الان کجا زندگی می‌کنی؟",
        "explainFa": "ضمیر «you» با «do» پرسش می‌سازد.",
        "chunks": [
          "Where",
          "does",
          "you live",
          "now?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "Where does you live now?",
        "matchLeft": "Where",
        "matchRight": "do you live now"
      },
      {
        "id": "p1_l7_12",
        "lesson": 7,
        "ruleTag": "محل زندگی با on و نام خیابان",
        "sentence": "My aunt lives on Ferdowsi Street.",
        "target": "on",
        "cloze": "My aunt lives _____ Ferdowsi Street.",
        "promptHint": "in / on / at",
        "options": [
          "on",
          "at",
          "to",
          "into"
        ],
        "fa": "خاله‌ام در خیابان فردوسی زندگی می‌کند.",
        "explainFa": "برای نام خیابان بدون شماره، «on Ferdowsi Street» رایج است؛ در بعضی گونه‌های انگلیسی «in» نیز به کار می‌رود.",
        "chunks": [
          "My aunt",
          "lives",
          "at",
          "Ferdowsi Street."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "on",
        "flawedSentence": "My aunt lives at Ferdowsi Street.",
        "matchLeft": "lives on",
        "matchRight": "Ferdowsi Street",
        "altAnswers": [
          "in"
        ]
      },
      {
        "id": "p1_l7_13",
        "lesson": 7,
        "ruleTag": "بیدار شدن با at",
        "sentence": "My father usually gets up at six o'clock.",
        "target": "at",
        "cloze": "My father usually gets up _____ six o'clock.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "to"
        ],
        "fa": "پدرم معمولاً ساعت ۶ بیدار می‌شود.",
        "explainFa": "با ساعت دقیق «at» به‌کار می‌رود.",
        "chunks": [
          "My father usually",
          "gets up",
          "in",
          "six o'clock."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "My father usually gets up in six o'clock.",
        "matchLeft": "My father",
        "matchRight": "gets up at six o'clock"
      },
      {
        "id": "p1_l7_14",
        "lesson": 7,
        "ruleTag": "پرسش what time",
        "sentence": "Excuse me, what time is it? — It is half past ten.",
        "target": "what time",
        "cloze": "Excuse me, _____ is it? — It is half past ten.",
        "promptHint": "time",
        "options": [
          "what time",
          "what hour",
          "how time",
          "when time"
        ],
        "fa": "ببخشید، ساعت چند است؟ — ساعت ده و نیم است.",
        "explainFa": "برای پرسیدن ساعت می‌گوییم «What time is it?»؛ «what hour» در انگلیسی رایج نیست.",
        "chunks": [
          "Excuse me,",
          "what hour",
          "is it? — It",
          "is half past ten."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "what time",
        "flawedSentence": "Excuse me, what hour is it? — It is half past ten.",
        "matchLeft": "What time",
        "matchRight": "is it?"
      },
      {
        "id": "p1_l7_15",
        "lesson": 7,
        "ruleTag": "شروع کلاس با at",
        "sentence": "Our class starts at eight in the morning.",
        "target": "at",
        "cloze": "Our class starts _____ eight in the morning.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "to"
        ],
        "fa": "کلاس ما ساعت ۸ صبح شروع می‌شود.",
        "explainFa": "«at» با ساعت دقیق به‌کار می‌رود.",
        "chunks": [
          "Our class starts",
          "in",
          "eight in",
          "the morning."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "at",
        "flawedSentence": "Our class starts in eight in the morning.",
        "matchLeft": "Our class",
        "matchRight": "starts at eight"
      },
      {
        "id": "p1_l8_6",
        "lesson": 8,
        "ruleTag": "some در تعارف مؤدبانه",
        "sentence": "Would you like some tea?",
        "target": "some",
        "cloze": "Would you like _____ tea?",
        "promptHint": "some",
        "options": [
          "some",
          "a",
          "many",
          "a few"
        ],
        "fa": "آیا کمی چای میل دارید؟",
        "explainFa": "فراتر از کتاب — قاعدهٔ این درس: نوشیدنی‌ها غیرقابل‌شمارش‌اند و در تعارف «some» می‌گیرند: «some tea» (یا «a cup of tea»). «a tea» به معنی «یک فنجان چای» در مکالمه شنیده می‌شود، ولی جواب کتاب و امتحان «some» است.",
        "chunks": [
          "Would you",
          "like",
          "a",
          "tea?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "some",
        "flawedSentence": "Would you like a tea?",
        "matchLeft": "Would you like",
        "matchRight": "some tea",
        "noTyping": true
      },
      {
        "id": "p1_l8_7",
        "lesson": 8,
        "ruleTag": "توافق are با favorite fruits",
        "sentence": "My favorite fruits are apples and dates.",
        "target": "are",
        "cloze": "My favorite fruits _____ apples and dates.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "میوه‌های مورد علاقه‌ام سیب و خرما هستند.",
        "explainFa": "فاعل «My favorite fruits» جمع است، پس «are» می‌گیرد.",
        "chunks": [
          "My favorite",
          "fruits",
          "is",
          "apples and dates."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "are",
        "flawedSentence": "My favorite fruits is apples and dates.",
        "matchLeft": "My favorite fruits",
        "matchRight": "are apples and dates",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l8_8",
        "lesson": 8,
        "ruleTag": "the با غذای مشخص",
        "sentence": "Do you like the traditional soup?",
        "target": "the",
        "cloze": "Do you like _____ traditional soup?",
        "promptHint": "the",
        "options": [
          "the",
          "a",
          "an",
          "some"
        ],
        "fa": "آیا سوپ سنتی را دوست دارید؟",
        "explainFa": "وقتی یک غذای مشخص را می‌شناسیم از «the» استفاده می‌کنیم.",
        "chunks": [
          "Do you",
          "like",
          "a",
          "traditional soup?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "the",
        "flawedSentence": "Do you like a traditional soup?",
        "matchLeft": "Do you like",
        "matchRight": "the traditional soup",
        "noTyping": true
      },
      {
        "id": "p1_l8_9",
        "lesson": 8,
        "ruleTag": "گرسنگی با am",
        "sentence": "I am very hungry now.",
        "target": "am",
        "cloze": "I _____ very hungry now.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من الان خیلی گرسنه هستم.",
        "explainFa": "در زمان حال با ضمیر «I» از «am» استفاده می‌کنیم: «I am hungry».",
        "chunks": [
          "I",
          "is",
          "very hungry",
          "now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is very hungry now.",
        "matchLeft": "I",
        "matchRight": "am very hungry now"
      },
      {
        "id": "p1_l8_10",
        "lesson": 8,
        "ruleTag": "تشنگی با is",
        "sentence": "She is thirsty after the game.",
        "target": "is",
        "cloze": "She _____ thirsty after the game.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "او بعد از بازی تشنه است.",
        "explainFa": "«She» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "She",
          "are",
          "thirsty after",
          "the game."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "She are thirsty after the game.",
        "matchLeft": "She",
        "matchRight": "is thirsty after the game",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l8_11",
        "lesson": 8,
        "ruleTag": "تعارف با a cup of",
        "sentence": "Would you like a cup of tea?",
        "target": "a",
        "cloze": "Would you like _____ cup of tea?",
        "promptHint": "a / an",
        "options": [
          "a",
          "an",
          "some",
          "any"
        ],
        "fa": "یک فنجان چای میل دارید؟",
        "explainFa": "فراتر از کتاب — «cup» با صدای صامت شروع می‌شود، پس «a» می‌آید: «a cup of tea».",
        "chunks": [
          "Would you",
          "like",
          "an",
          "cup of tea?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "a",
        "flawedSentence": "Would you like an cup of tea?",
        "matchLeft": "Would you like",
        "matchRight": "a cup of tea?"
      },
      {
        "id": "p1_l8_12",
        "lesson": 8,
        "ruleTag": "غذا خوردن جمع با are",
        "sentence": "They are eating lunch now.",
        "target": "are",
        "cloze": "They _____ eating lunch now.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها الان ناهار می‌خورند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "eating lunch",
          "now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is eating lunch now.",
        "matchLeft": "They",
        "matchRight": "are eating lunch now"
      },
      {
        "id": "p1_l8_13",
        "lesson": 8,
        "ruleTag": "پرسش غذای محبوب",
        "sentence": "What is your favorite food?",
        "target": "is",
        "cloze": "What _____ your favorite food?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "do"
        ],
        "fa": "غذای محبوب تو چیست؟",
        "explainFa": "«your favorite food» مفرد است، پس «is» می‌گیرد.",
        "chunks": [
          "What",
          "are",
          "your favorite",
          "food?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "What are your favorite food?",
        "matchLeft": "What",
        "matchRight": "is your favorite food",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p1_l8_14",
        "lesson": 8,
        "ruleTag": "منفی like با don't",
        "sentence": "We don't like spicy food.",
        "target": "don't",
        "cloze": "We _____ like spicy food.",
        "promptHint": "do",
        "options": [
          "don't",
          "aren't",
          "doesn't",
          "not"
        ],
        "fa": "ما غذای تند دوست نداریم.",
        "explainFa": "«like» فعل اصلی است، پس منفی آن با «don't» ساخته می‌شود، نه «aren't».",
        "chunks": [
          "We",
          "aren't",
          "like spicy",
          "food."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "don't",
        "flawedSentence": "We aren't like spicy food.",
        "matchLeft": "We don't",
        "matchRight": "like spicy food",
        "altAnswers": [
          "didn't"
        ]
      },
      {
        "id": "p1_l8_15",
        "lesson": 8,
        "ruleTag": "گرسنگی و تشنگی با are",
        "sentence": "We are hungry and thirsty after running.",
        "target": "are",
        "cloze": "We _____ hungry and thirsty after running.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "ما بعد از دویدن گرسنه و تشنه هستیم.",
        "explainFa": "«We» جمع است و «are» می‌گیرد.",
        "chunks": [
          "We",
          "is",
          "hungry and thirsty",
          "after running."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "We is hungry and thirsty after running.",
        "matchLeft": "We",
        "matchRight": "are hungry and thirsty",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p1_l8_16",
        "lesson": 8,
        "ruleTag": "تعارف و درخواست: I'd like some",
        "sentence": "Sounds good, but I'd like some tea with my cake.",
        "target": "some",
        "cloze": "Sounds good, but I'd like _____ tea with my cake.",
        "promptHint": "some",
        "options": [
          "some",
          "any",
          "many",
          "much"
        ],
        "fa": "خوب است، ولی من با کیکم کمی چای می‌خواهم.",
        "explainFa": "کتاب (ص ۴۲: «I'd like some tea with my cake»): «I'd like» درخواستِ مؤدبانه است و در جملهٔ مثبت «some» می‌گیرد.",
        "chunks": [
          "Sounds good, but",
          "I'd like",
          "any",
          "tea with my cake."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "some",
        "flawedSentence": "Sounds good, but I'd like any tea with my cake.",
        "matchLeft": "I'd like ___ tea",
        "matchRight": "some",
        "noTyping": true
      },
      {
        "id": "p1_l8_17",
        "lesson": 8,
        "ruleTag": "تعارف: پیشنهاد با some",
        "sentence": "How about some cake and milk? — Sounds good!",
        "target": "some",
        "cloze": "How about _____ cake and milk? — Sounds good!",
        "promptHint": "some",
        "options": [
          "some",
          "any",
          "many",
          "much"
        ],
        "fa": "کمی کیک و شیر چطور است؟ — عالیه!",
        "explainFa": "کتاب (ص ۴۳: «How about some cake and milk?»): در پیشنهاد، حتی به شکل پرسشی، «some» می‌آید نه «any».",
        "chunks": [
          "How about",
          "any",
          "cake and milk?",
          "— Sounds good!"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "some",
        "flawedSentence": "How about any cake and milk? — Sounds good!",
        "matchLeft": "How about ___ cake and milk?",
        "matchRight": "some",
        "noTyping": true
      },
      {
        "id": "p1_l8_18",
        "lesson": 8,
        "ruleTag": "پرسش متقابل How about you",
        "sentence": "I'm hungry. How about you and your brother? — We are hungry too!",
        "target": "you",
        "cloze": "I'm hungry. How about _____ and your brother? — We are hungry too!",
        "promptHint": "you",
        "options": [
          "you",
          "your",
          "yours",
          "he"
        ],
        "fa": "من گرسنه‌ام. تو و برادرت چطور؟ — ما هم گرسنه‌ایم!",
        "explainFa": "کتاب (ص ۴۲: «I'm hungry. How about you?»): «How about you?» یعنی «تو چطور؟»؛ بعد از «about» ضمیر مفعولی می‌آید: «How about you and your brother?».",
        "chunks": [
          "I'm hungry. How about",
          "your",
          "and your brother? —",
          "We are hungry too!"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "you",
        "flawedSentence": "I'm hungry. How about your and your brother? — We are hungry too!",
        "matchLeft": "How about ___ and your brother?",
        "matchRight": "you",
        "noTyping": true
      }
    ],
    "onboarding": {
      "id": "p1_onboard",
      "sentence": "This is my friend, Reza.",
      "cloze": "This _____ my friend, Reza.",
      "target": "is",
      "options": [
        "is",
        "am",
        "are",
        "be"
      ],
      "fa": "این دوست من، رضا است.",
      "explainFa": "برای یک نفر («This») فعل «is» می‌آید."
    }
  },
  "prospect_2": {
    "id": "prospect_2",
    "name": "Prospect 2",
    "titleFa": "پایه هشتم",
    "modeBadgeFa": "الگوهای کاربردی جمله (Communicative Patterns)",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: My Nationality",
        "titleFa": "درس ۱: کشور و ملیت (Where ... from? • Country vs Nationality)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "بعد از حرف اضافه «from» نام کشور (Iran, Spain, China) می‌آید، اما بدون «from» صفت ملیت (Iranian, Spanish, Chinese) به کار می‌رود.",
        "formulas": [
          {
            "label": "نام کشور (+)",
            "chips": [
              {
                "role": "subj",
                "text": "They"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "sig",
                "text": "from"
              },
              {
                "role": "obj",
                "text": "Iran."
              }
            ],
            "exampleEn": "Where are you from? — I'm from Brazil.",
            "exampleFa": "اهل کجایی؟ — اهل برزیل هستم.",
            "learnerGlossFa": "آن‌ها اهل ایران هستند."
          },
          {
            "label": "صفت ملیت (+)",
            "chips": [
              {
                "role": "subj",
                "text": "They"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "obj",
                "text": "Iranian."
              }
            ],
            "exampleEn": "Are they French? — Yes, they are.",
            "exampleFa": "آیا آن‌ها فرانسوی هستند؟ — بله.",
            "learnerGlossFa": "آن‌ها ایرانی هستند."
          }
        ],
        "signals": [
          "from + Country",
          "Iran / Iranian",
          "France / French",
          "Spain / Spanish"
        ],
        "traps": [
          {
            "wrong": "He is from Iranian.",
            "right": "He is from Iran. / He is Iranian.",
            "noteFa": "در این جمله برای مبدأ از «from Iran» و برای ملیت از «He is Iranian» استفاده کن؛ بعد از «from» می‌توان نام مکان‌های دیگری مانند شهر را هم آورد."
          },
          {
            "wrong": "Are those tourists Japan?",
            "right": "Are those tourists Japanese?",
            "noteFa": "در این جمله پس از فعل بودن، صفت ملیت «Japanese» مناسب است؛ «Japan» نام کشور است."
          }
        ],
        "timelineType": "clause_link",
        "timelineCaptionFa": "قانون طلایی: from + نام کشور (Iran) در برابر بدون from + ملیت (Iranian)",
        "contextDialogue": {
          "lineA": "Where are those tourists from? Are they Spanish?",
          "faA": "آن گردشگران اهل کجا هستند؟ آیا اسپانیایی‌اند؟",
          "lineB": "No, they aren't. They are from France; they are French.",
          "faB": "نه، نیستند. آن‌ها اهل فرانسه هستند؛ فرانسوی‌اند."
        },
        "guidedDiscovery": {
          "questionFa": "نگاه دقیق به جمله پاسخ بیندازید: چه تفاوتی میان «France» و «French» وجود دارد؟",
          "options": [
            "بعد از حرف اضافه from نام کشور (France) و بدون from صفت ملیت (French) آمده است",
            "هر دو نام کشور هستند",
            "بعد از from باید صفت ملیت بیاید"
          ],
          "correctIdx": 0,
          "insightFa": "در این الگو بعد از «from» نام کشور یا شهر می‌آید: «from Iran». برای گفتن ملیت می‌توان بدون «from» گفت «Iranian»."
        },
        "threeD": {
          "formFa": "be + from + Country (Iran/China/Spain) | be + Nationality (Iranian/Chinese/Spanish)",
          "meaningFa": "بیان خاستگاه جغرافیایی و هویت ملی افراد",
          "useFa": "گفت‌وگوهای بین‌المللی، فرودگاه و معرفی شخصیت‌های علمی و ورزشی جهان"
        },
        "learnerGuide": {
          "explainFa": "برای گفتن کشور مبدأ، از from پیش از نام کشور استفاده کن. برای بیان ملیت می‌توان صفت ملیت را بعد از فعل بودن آورد. نام کشور و صفت ملیت را با هم اشتباه نگیر.",
          "examples": [
            {
              "en": "I am from Iran.",
              "fa": "من اهل ایران هستم."
            },
            {
              "en": "I am Iranian.",
              "fa": "من ایرانی هستم."
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: My Week",
        "titleFa": "درس ۲: برنامه هفتگی و روزهای هفته (on + Day)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای بیان کارهای تکراری هفتگی از حال ساده و قبل از روزهای هفته از حرف اضافه «on» (مثل on Mondays) استفاده می‌کنیم.",
        "formulas": [
          {
            "label": "پرسش هفتگی (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "do"
              },
              {
                "role": "subj",
                "text": "you"
              },
              {
                "role": "verb",
                "text": "do"
              },
              {
                "role": "sig",
                "text": "on Fridays?"
              }
            ],
            "exampleEn": "I visit my relatives on Fridays.",
            "exampleFa": "من جمعه‌ها به دیدن اقوامم می‌روم.",
            "learnerGlossFa": "تو جمعه‌ها چه کار می‌کنی؟"
          },
          {
            "label": "پرسش درباره برنامه هفتگی (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "do / does"
              },
              {
                "role": "subj",
                "text": "you / she"
              },
              {
                "role": "verb",
                "text": "do"
              },
              {
                "role": "sig",
                "text": "on Fridays?"
              }
            ],
            "exampleEn": "What do you usually do on weekends?",
            "exampleFa": "معمولاً آخر هفته‌ها چه کار می‌کنی؟",
            "learnerGlossFa": "تو جمعه‌ها چه کار می‌کنی؟ / او جمعه‌ها چه کار می‌کند؟ برای you از do و برای she از does استفاده می‌شود."
          }
        ],
        "signals": [
          "on Saturdays",
          "on weekdays",
          "on the weekend",
          "in the morning"
        ],
        "traps": [
          {
            "wrong": "in Tuesday",
            "right": "on Tuesday",
            "noteFa": "قبل از تمام روزهای هفته حرف اضافه «on» می‌آید، نه «in»."
          },
          {
            "wrong": "Saeed go to the gym on Tuesdays.",
            "right": "Saeed goes to the gym on Tuesdays.",
            "noteFa": "در زمان حال ساده، برای سوم‌شخص مفرد (he / she / Saeed) فعل حتماً «s-» یا «es-» می‌گیرد."
          }
        ],
        "timelineType": "habit_dots",
        "timelineCaptionFa": "تکرار منظم برنامه هفتگی در روزهای مشخص با حرف اضافه on",
        "contextDialogue": {
          "lineA": "What do you usually do on Fridays?",
          "faA": "معمولاً روزهای جمعه چه کار می‌کنی؟",
          "lineB": "I visit my grandparents in the morning and play football in the afternoon.",
          "faB": "صبح به دیدن پدربزرگ و مادربزرگم می‌روم و بعدازظهر فوتبال بازی می‌کنم."
        },
        "guidedDiscovery": {
          "questionFa": "حرف اضافه پیش از «روزهای هفته» و پیش از «بخش‌های روز» به ترتیب کدام است؟",
          "options": [
            "on برای روزهای هفته (on Fridays) و in برای بخش‌های روز (in the morning)",
            "in برای روزها و on برای صبح و عصر",
            "at برای هر دو"
          ],
          "correctIdx": 0,
          "insightFa": "برای روزهای هفته معمولاً «on» می‌آید؛ برای صبح، بعدازظهر و عصر معمولاً «in the» به کار می‌رود، اما عبارت رایج شب «at night» است."
        },
        "threeD": {
          "formFa": "What do/does + Subj + do + on + Day(s)? | in the morning/afternoon/evening",
          "meaningFa": "توصیف عادت‌ها و برنامه‌های تکرارشونده هفتگی",
          "useFa": "زمان‌بندی فعالیت‌های درسی، ورزشی و خانوادگی در طول هفته"
        },
        "learnerGuide": {
          "explainFa": "برای عادتی که در روزهای هفته تکرار می‌شود از حال ساده استفاده می‌کنیم. پیش از نام روز از on استفاده کن. در پرسش با you از do و با he یا she از does استفاده می‌شود و فعل اصلی ساده می‌ماند.",
          "examples": [
            {
              "en": "I study on Mondays.",
              "fa": "من دوشنبه‌ها درس می‌خوانم."
            },
            {
              "en": "What does she do on Fridays?",
              "fa": "او جمعه‌ها چه کار می‌کند؟"
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: My Abilities",
        "titleFa": "درس ۳: بیان توانایی‌ها و مهارت‌ها (can / can't + Base Verb)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای بیان توانایی از «can / can’t + فعل ساده» استفاده می‌کنیم. در کتاب (ص ۲۶–۲۷)، مهارت با «be good at + V-ing» هم بیان می‌شود؛ مانند «Are you good at drawing? — Yes, I am». بعد از «at» فعل به شکل «-ing» می‌آید.",
        "formulas": [
          {
            "label": "توانایی (+/−)",
            "chips": [
              {
                "role": "subj",
                "text": "She"
              },
              {
                "role": "aux",
                "text": "can / can't"
              },
              {
                "role": "verb",
                "text": "speak"
              },
              {
                "role": "obj",
                "text": "English."
              }
            ],
            "exampleEn": "Ali can ride a bicycle.",
            "exampleFa": "علی می‌تواند دوچرخه‌سواری کند.",
            "learnerGlossFa": "او می‌تواند یا نمی‌تواند انگلیسی صحبت کند."
          },
          {
            "label": "پرسش مهارت (good at + V-ing)",
            "chips": [
              {
                "role": "aux",
                "text": "Are"
              },
              {
                "role": "subj",
                "text": "you"
              },
              {
                "role": "verb",
                "text": "good at drawing?"
              }
            ],
            "exampleEn": "Are you good at drawing? — Yes, I am.",
            "exampleFa": "آیا در نقاشی مهارت داری؟ — بله، دارم.",
            "learnerGlossFa": "آیا در نقاشی مهارت داری؟"
          }
        ],
        "signals": [
          "can",
          "can't / cannot",
          "well",
          "at all"
        ],
        "traps": [
          {
            "wrong": "He can speaks English.",
            "right": "He can speak English.",
            "noteFa": "بعد از «can» هرگز به فعل «-s» یا «to» اضافه نمی‌کنیم!"
          },
          {
            "wrong": "He doesn't can swim in the pool.",
            "right": "He can't swim in the pool.",
            "noteFa": "فعل کمکی «can» خودش مستقیم با «not» منفی می‌شود (can't / cannot) و هرگز «don't / doesn't» نمی‌گیرد."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "ثابت ماندن شکل ساده فعل بعد از can / can't برای تمام فاعل‌ها",
        "contextDialogue": {
          "lineA": "Can your little sister ride a bicycle?",
          "faA": "آیا خواهر کوچکت می‌تواند دوچرخه‌سواری کند؟",
          "lineB": "No, she can't ride a bike, but she can draw nice pictures.",
          "faB": "نه، نمی‌تواند دوچرخه‌سواری کند، اما می‌تواند نقاشی‌های زیبایی بکشد."
        },
        "guidedDiscovery": {
          "questionFa": "با اینکه فاعل «she» سوم‌شخص مفرد است، چرا فعل «draw» حرف s نگرفته است؟",
          "options": [
            "چون بعد از فعل کمکی وجهی can/can't همیشه شکل کاملاً ساده فعل می‌آید",
            "چون جمله گذشته است",
            "چون pictures جمع است"
          ],
          "correctIdx": 0,
          "insightFa": "آفرین! «can» مثل یک سپر عمل می‌کند و اجازه نمی‌دهد فعلِ بعدش «s»، «ed»، «ing» یا «to» بگیرد."
        },
        "threeD": {
          "formFa": "Subj + can / can't + Base Verb | Can + Subj + Base Verb?",
          "meaningFa": "بیان توانایی‌ها، مهارت‌ها و استعدادهای فردی (مثبت و منفی)",
          "useFa": "معرفی مهارت‌های ورزشی، هنری، فنی و زبانی خود و دیگران"
        },
        "learnerGuide": {
          "explainFa": "Can توانایی را نشان می‌دهد و برای همهٔ فاعل‌ها یکسان است. فعل بعد از can یا can’t به شکل ساده می‌آید؛ به آن s یا to اضافه نمی‌کنیم. برای پرسش، can را پیش از فاعل قرار می‌دهیم. در درس ۳ کتاب (ص ۲۶–۲۷)، برای مهارت از be good at + V-ing نیز استفاده می‌کنیم: Are you good at drawing? پاسخ کوتاه Yes, I am یا No, I’m not است.",
          "examples": [
            {
              "en": "She can swim.",
              "fa": "او می‌تواند شنا کند."
            },
            {
              "en": "Can you draw?",
              "fa": "آیا می‌توانی نقاشی بکشی؟"
            },
            {
              "en": "Are you good at drawing? — Yes, I am.",
              "fa": "آیا در نقاشی مهارت داری؟ — بله، دارم."
            }
          ]
        }
      },
      {
        "id": 4,
        "titleEn": "Lesson 4: My Health",
        "titleFa": "درس ۴: بیماری‌ها و توصیه سلامتی (have a headache • should)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای بیان بیماری از «have / has» و برای توصیه از «should / shouldn’t + فعل ساده» استفاده می‌کنیم. کتاب (ص ۳۶) با «Why don’t you + فعل ساده?» هم پیشنهاد می‌دهد؛ مانند «Why don’t you get some rest?» یعنی «چرا کمی استراحت نمی‌کنی؟».",
        "formulas": [
          {
            "label": "پرسش بیماری (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What's"
              },
              {
                "role": "obj",
                "text": "wrong with you?"
              }
            ],
            "exampleEn": "I have a sore throat and a fever.",
            "exampleFa": "گلودرد و تب دارم.",
            "learnerGlossFa": "چه مشکلی داری؟"
          },
          {
            "label": "توصیه (should / Why don’t you)",
            "chips": [
              {
                "role": "subj",
                "text": "You should"
              },
              {
                "role": "verb",
                "text": "see a doctor."
              },
              {
                "role": "obj",
                "text": "Why don't you get some rest?"
              }
            ],
            "exampleEn": "You have a headache. Why don't you get some rest?",
            "exampleFa": "سردرد داری. بهتر است کمی استراحت کنی؛ چرا کمی استراحت نمی‌کنی؟",
            "learnerGlossFa": "بهتر است به پزشک مراجعه کنی. چرا کمی استراحت نمی‌کنی؟"
          }
        ],
        "signals": [
          "What's wrong",
          "What's the matter",
          "have a cold",
          "should / shouldn't"
        ],
        "traps": [
          {
            "wrong": "You should to rest.",
            "right": "You should rest.",
            "noteFa": "بعد از «should / shouldn't» فعل بدون «to» می‌آید."
          },
          {
            "wrong": "Mina is a bad toothache today.",
            "right": "Mina has a bad toothache today.",
            "noteFa": "برای بیان بیماری‌ها و دردها (headache, cold, fever) از فعل «have / has» استفاده می‌شود، نه «am / is / are»."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "بیان عارضه سلامتی با have/has و ارائه توصیه با should / shouldn't",
        "contextDialogue": {
          "lineA": "You look pale! What's wrong with you?",
          "faA": "رنگ‌پریده به نظر می‌رسی! مشکلت چیست؟",
          "lineB": "I have a bad sore throat. — You should see a doctor and rest.",
          "faB": "گلودرد بدی دارم. — باید به پزشک مراجعه کنی و استراحت کنی."
        },
        "guidedDiscovery": {
          "questionFa": "در توصیه پزشکی بالا، بعد از «should» فعل به چه شکلی آمده است؟",
          "options": [
            "شکل ساده بدون to (see و rest)",
            "مصدر با to (to see)",
            "شکل استمراری (seeing)"
          ],
          "correctIdx": 0,
          "insightFa": "درست است! دقیقاً مانند can، بعد از «should / shouldn't» هم فعل بدون «to» می‌آید."
        },
        "threeD": {
          "formFa": "What's wrong? / What's the matter? → have/has + بیماری | should/shouldn't + Base Verb",
          "meaningFa": "شرح علائم بیماری و ارائه توصیه دلسوزانه درمانی",
          "useFa": "مکالمه در مطب پزشک، داروخانه یا احوال‌پرسی از دوست بیمار"
        },
        "learnerGuide": {
          "explainFa": "برای بیان برخی دردها و ناخوشی‌ها از have یا has همراه نام درد استفاده می‌کنیم. برای پیشنهاد یا توصیهٔ زبانی، should و برای توصیه به انجام‌ندادن کاری، shouldn’t می‌آید. فعل پس از آن‌ها ساده است. کتاب (ص ۳۶) برای پیشنهاد از Why don’t you + فعل ساده? هم استفاده می‌کند؛ اینجا هدف توصیه است، نه پرسیدن علت. مانند Why don’t you get some rest?",
          "examples": [
            {
              "en": "I have a headache.",
              "fa": "من سردرد دارم."
            },
            {
              "en": "You should rest.",
              "fa": "بهتر است استراحت کنی."
            },
            {
              "en": "Why don't you get some rest?",
              "fa": "چرا کمی استراحت نمی‌کنی؟"
            }
          ]
        }
      },
      {
        "id": 5,
        "titleEn": "Lesson 5: My City",
        "titleFa": "درس ۵: توصیف شهر و مکان‌ها (There is / There are)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای بیان «وجود داشتن» یک مکان مفرد از «There is a ...» و برای اسم جمع از «There are ...» بهره می‌گیریم.",
        "formulas": [
          {
            "label": "وجود مفرد (+)",
            "chips": [
              {
                "role": "aux",
                "text": "There is"
              },
              {
                "role": "obj",
                "text": "a big museum"
              },
              {
                "role": "sig",
                "text": "in our city."
              }
            ],
            "exampleEn": "Is there a bank near here?",
            "exampleFa": "آیا بانکی نزدیک اینجا هست؟",
            "learnerGlossFa": "در شهر ما یک موزهٔ بزرگ وجود دارد."
          },
          {
            "label": "وجود جمع (+)",
            "chips": [
              {
                "role": "aux",
                "text": "There are"
              },
              {
                "role": "obj",
                "text": "many green parks"
              },
              {
                "role": "sig",
                "text": "in Shiraz."
              }
            ],
            "exampleEn": "There aren't any zoos in this town.",
            "exampleFa": "هیچ باغ‌وحشی در این شهرک نیست.",
            "learnerGlossFa": "در شیراز پارک‌های سبز زیادی وجود دارند."
          }
        ],
        "signals": [
          "There is a",
          "There are many",
          "Is there",
          "Are there any"
        ],
        "traps": [
          {
            "wrong": "There is three shrines.",
            "right": "There are three shrines.",
            "noteFa": "چون «three shrines» جمع است، باید از «There are» استفاده شود."
          },
          {
            "wrong": "There isn't any parks near here.",
            "right": "There aren't any parks near here.",
            "noteFa": "چون «parks» جمع است، شکل منفی نیز باید جمع بیاید: «There aren't any + اسم جمع»."
          }
        ],
        "timelineType": "scale_compare",
        "timelineCaptionFa": "تطابق There is با اسم مفرد و There are با اسم جمع در توصیف شهر",
        "contextDialogue": {
          "lineA": "Are there any historical museums in your city?",
          "faA": "آیا موزه تاریخی در شهر شما وجود دارد؟",
          "lineB": "Yes, there are two big museums, and there is an old bazaar too.",
          "faB": "بله، دو موزه بزرگ وجود دارد و یک بازار قدیمی هم هست."
        },
        "guidedDiscovery": {
          "questionFa": "انتخاب میان «There is» و «There are» به چه چیزی وابسته است؟",
          "options": [
            "به مفرد یا جمع بودن اسمی که بلافاصله بعد از آن معرفی می‌شود",
            "به بزرگ یا کوچک بودن شهر",
            "هر دو یکسان‌اند"
          ],
          "correctIdx": 0,
          "insightFa": "عالی! «two big museums» جمع است (There are) و «an old bazaar» مفرد است (There is)."
        },
        "threeD": {
          "formFa": "There is + a/an + Singular Noun | There are + Plural Noun | Is/Are there ...?",
          "meaningFa": "بیان وجود یا عدم وجود امکانات، بناها و مکان‌ها در شهر یا محله",
          "useFa": "معرفی جاذبه‌های گردشگری و راهنمایی مسافران در شهر"
        },
        "learnerGuide": {
          "explainFa": "There is و there are برای معرفی وجود یک چیز یا چند چیز به کار می‌روند. برای اسم مفرد از there is و برای اسم جمع از there are استفاده کن. در پرسش جای is یا are و there عوض می‌شود.",
          "examples": [
            {
              "en": "There is a park here.",
              "fa": "اینجا یک پارک وجود دارد."
            },
            {
              "en": "Are there any banks?",
              "fa": "آیا بانکی وجود دارد؟"
            }
          ]
        }
      },
      {
        "id": 6,
        "titleEn": "Lesson 6: My Village",
        "titleFa": "درس ۶: روستا و توصیف آب‌وهوا (What's the weather like?)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "برای پرسش از وضعیت هوا می‌گوییم «What is the weather like?» و در پاسخ از «It is + صفت هواشناسی (sunny, rainy, windy, cold)» استفاده می‌کنیم.",
        "formulas": [
          {
            "label": "پرسش آب‌وهوا (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What's"
              },
              {
                "role": "subj",
                "text": "the weather"
              },
              {
                "role": "verb",
                "text": "like?"
              }
            ],
            "exampleEn": "It's cool and rainy in autumn.",
            "exampleFa": "در پاییز هوا خنک و بارانی است.",
            "learnerGlossFa": "هوا چطور است؟"
          },
          {
            "label": "توصیف آب‌وهوا با It (+)",
            "chips": [
              {
                "role": "subj",
                "text": "It"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "obj",
                "text": "sunny / snowy / cold"
              },
              {
                "role": "sig",
                "text": "in winter."
              }
            ],
            "exampleEn": "It is cool and rainy in autumn.",
            "exampleFa": "هوا در پاییز خنک و بارانی است.",
            "learnerGlossFa": "هوا در زمستان آفتابی، برفی یا سرد است."
          }
        ],
        "signals": [
          "weather like",
          "It's sunny / snowy",
          "in spring / winter",
          "الگوی کلیدی کتاب درسی"
        ],
        "traps": [
          {
            "wrong": "How is the weather like?",
            "right": "What is the weather like? / How is the weather?",
            "noteFa": "وقتی «like» در انتهای جمله هست، کلمه پرسشی حتماً «What» است، نه «How»!"
          },
          {
            "wrong": "How is the weather like today?",
            "right": "What is the weather like today? / How is the weather today?",
            "noteFa": "دام بسیار مهم امتحانی: یا می‌گوییم «What is the weather like?» (با like) یا «How is the weather?» (بدون like)!"
          }
        ],
        "timelineType": "clause_link",
        "timelineCaptionFa": "تفکیک ظریف What is the weather like? (با like) و How is the weather? (بدون like)",
        "contextDialogue": {
          "lineA": "What is the weather like in your village in spring?",
          "faA": "هوای روستای شما در بهار چطور است؟",
          "lineB": "It is mild and rainy, and the hills are very green.",
          "faB": "معتدل و بارانی است و تپه‌ها بسیار سرسبزند."
        },
        "guidedDiscovery": {
          "questionFa": "اگر واژه «like» را از انتهای سؤال بالا حذف کنیم، کلمه پرسشی «What» باید به چه کلمه‌ای تبدیل شود؟",
          "options": [
            "به «How» (یعنی How is the weather?)",
            "به «Who»",
            "به «When»"
          ],
          "correctIdx": 0,
          "insightFa": "دام امتحانی بسیار مهم! «What ... like?» = «How ...?» (هرگز How ... like نگویید!)."
        },
        "threeD": {
          "formFa": "What's the weather like? / How's the weather? → It's + sunny/rainy/cold/windy",
          "meaningFa": "گزارش وضعیت جوی و اقلیم شهرها و روستاها در فصول چهارگانه",
          "useFa": "برنامه‌ریزی سفر و توصیف طبیعت روستا با حرف اضافه in قبل از فصل‌ها"
        },
        "learnerGuide": {
          "explainFa": "برای پرسیدن وضعیت هوا از What is the weather like استفاده کن. در پاسخ، It is می‌تواند با صفت‌هایی مانند sunny یا cold بیاید. عبارت It is raining به جای صفت، یک فعل استمراری برای باریدن را نشان می‌دهد.",
          "examples": [
            {
              "en": "What is the weather like?",
              "fa": "هوا چطور است؟"
            },
            {
              "en": "It is sunny.",
              "fa": "هوا آفتابی است."
            }
          ]
        }
      },
      {
        "id": 7,
        "titleEn": "Lesson 7: My Hobbies",
        "titleFa": "درس ۷: سرگرمی‌ها و اوقات فراغت (enjoy + V-ing • as a hobby)",
        "categoryFa": "الگوی ارتباطی",
        "summaryFa": "کتاب (ص ۵۵) «enjoy + V-ing» را برای بیان سرگرمی آموزش می‌دهد. پس از «enjoy» فعل بعدی با «-ing» می‌آید؛ پس از «like» هم «-ing» و هم «to + فعل ساده» ممکن است. در تمرین تکمیلی از «interested in + V-ing» استفاده می‌کنیم. «good at + V-ing» در درس ۳ کتاب آمده است (ص ۲۶–۲۷).",
        "formulas": [
          {
            "label": "سرگرمی (کتاب ص ۵۵)",
            "chips": [
              {
                "role": "subj",
                "text": "I"
              },
              {
                "role": "verb",
                "text": "enjoy"
              },
              {
                "role": "sig",
                "text": "searching"
              },
              {
                "role": "obj",
                "text": "the Web."
              }
            ],
            "exampleEn": "What do you do in your free time? — I like playing computer games.",
            "exampleFa": "در اوقات فراغت چه کار می‌کنی؟ — دوست دارم بازی کامپیوتری کنم.",
            "learnerGlossFa": "من از جست‌وجو در وب لذت می‌برم."
          },
          {
            "label": "interested in — فراتر از کتاب",
            "chips": [
              {
                "role": "subj",
                "text": "I am"
              },
              {
                "role": "aux",
                "text": "interested in"
              },
              {
                "role": "verb",
                "text": "reading"
              },
              {
                "role": "obj",
                "text": "poems."
              }
            ],
            "exampleEn": "She is interested in listening to music.",
            "exampleFa": "او به گوش‌دادن به موسیقی علاقه‌مند است.",
            "learnerGlossFa": "من به خواندن شعر علاقه‌مندم."
          },
          {
            "label": "پرسش دربارهٔ اوقات فراغت (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "do"
              },
              {
                "role": "subj",
                "text": "you"
              },
              {
                "role": "verb",
                "text": "like doing"
              },
              {
                "role": "sig",
                "text": "in your free time?"
              }
            ],
            "exampleEn": "What do you like doing in your free time? — I like painting nature.",
            "exampleFa": "دوست داری در اوقات فراغتت چه کار کنی؟ — دوست دارم از طبیعت نقاشی بکشم.",
            "learnerGlossFa": "در وقت آزادت چه کاری را دوست داری انجام بدهی؟"
          }
        ],
        "signals": [
          "free time",
          "as a hobby",
          "enjoy / like + V-ing",
          "interested in (فراتر از کتاب)"
        ],
        "traps": [
          {
            "wrong": "I enjoy search the Web.",
            "right": "I enjoy searching the Web.",
            "noteFa": "کتاب (ص ۵۵): بعد از «enjoy» فعل با ing می‌آید: «I enjoy searching the Web»."
          },
          {
            "wrong": "I am interested in play chess.",
            "right": "I am interested in playing chess.",
            "noteFa": "فراتر از کتاب: اگر پس از حرف اضافهٔ «in» فعل بیاوریم، شکل «-ing» به کار می‌رود."
          },
          {
            "wrong": "Zahra is good in cooking Persian food.",
            "right": "Zahra is good at cooking Persian food.",
            "noteFa": "درس ۳ کتاب (ص ۲۶–۲۷): حرف اضافهٔ استاندارد پس از «good» برای بیان مهارت «at» است (good at + V-ing)؛ بعد از «interested» (فراتر از کتاب) حرف اضافهٔ «in» می‌آید."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "سرگرمی و اوقات فراغت: «as a hobby»، «in your free time» و «enjoy / like + V-ing» (کتاب ص ۵۴–۵۵)",
        "contextDialogue": {
          "lineA": "Do you have any hobbies, Zahra?",
          "faA": "زهرا، سرگرمی‌ای داری؟",
          "lineB": "Yes, I do. I watch movies as a hobby.",
          "faB": "بله، دارم. به‌عنوان سرگرمی فیلم می‌بینم."
        },
        "guidedDiscovery": {
          "questionFa": "در جملهٔ «I enjoy searching the Web» (کتاب ص ۵۵) چرا فعل search به شکل «searching» آمده است؟",
          "options": [
            "چون بعد از enjoy فعل با ing می‌آید",
            "چون زمان جمله گذشته است",
            "چون فاعل جمع است"
          ],
          "correctIdx": 0,
          "insightFa": "بعد از «enjoy»، فعل بعدی به شکل «-ing» می‌آید: «I enjoy searching the Web» (کتاب ص ۵۵). بعد از «like» می‌توان «-ing» یا «to + فعل ساده» آورد، مانند «I like playing» یا «I like to play»."
        },
        "threeD": {
          "formFa": "enjoy + V-ing | like + V-ing / to + V | as a hobby | in your free time | فراتر از کتاب: interested in + V-ing",
          "meaningFa": "بیان سرگرمی‌ها، علایق همیشگی و مهارت‌های فردی در اوقات فراغت",
          "useFa": "گفت‌وگو درباره علایق شخصی (پلی به مبحث Gerunds در پایه یازدهم!)"
        },
        "learnerGuide": {
          "explainFa": "برای صحبت دربارهٔ سرگرمی، پس از enjoy وقتی فعل دیگری می‌آید، شکل ing آن را به کار می‌بریم. پس از like می‌توان هم شکل ing و هم to همراه فعل ساده آورد. عبارت interested in در این درس فراتر از کتاب و برای تمرین بیشتر است.",
          "examples": [
            {
              "en": "I enjoy reading.",
              "fa": "من از خواندن لذت می‌برم."
            },
            {
              "en": "I like playing chess.",
              "fa": "من بازی شطرنج را دوست دارم."
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "p2_l1_1",
        "lesson": 1,
        "ruleTag": "نام کشور بعد از from",
        "sentence": "Those tourists are from Spain.",
        "target": "Spain",
        "cloze": "Those tourists are from _____.",
        "promptHint": "Spain / Spanish",
        "options": [
          "Spain",
          "Spanish",
          "a Spain",
          "the Spanish"
        ],
        "fa": "آن گردشگران اهل اسپانیا هستند.",
        "explainFa": "بعد از حرف اضافه «from» باید نام کشور (Spain) بیاید، نه ملیت (Spanish).",
        "chunks": [
          "Those tourists",
          "are",
          "from",
          "Spanish."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "Spain.",
        "flawedSentence": "Those tourists are from Spanish.",
        "matchLeft": "from + ___",
        "matchRight": "Spain (نام کشور)"
      },
      {
        "id": "p2_l1_2",
        "lesson": 1,
        "ruleTag": "صفت ملیت بدون from",
        "sentence": "Lionel Messi is not Brazilian; he is Argentinian.",
        "target": "Argentinian",
        "cloze": "Lionel Messi is not Brazilian; he is _____.",
        "promptHint": "nationality",
        "options": [
          "Argentinian",
          "Argentina",
          "from Argentinian",
          "an Argentina"
        ],
        "fa": "لیونل مسی برزیلی نیست؛ او آرژانتینی است.",
        "explainFa": "وقتی حرف اضافه «from» نداریم، مستقیم از صفت ملیت استفاده می‌کنیم.",
        "chunks": [
          "Lionel Messi",
          "is not Brazilian;",
          "he is",
          "Argentina."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "Argentinian.",
        "flawedSentence": "Lionel Messi is not Brazilian; he is Argentina.",
        "matchLeft": "بدون from",
        "matchRight": "Iranian / French",
        "noTyping": true
      },
      {
        "id": "p2_l1_3",
        "lesson": 1,
        "ruleTag": "پرسش ملیت",
        "sentence": "Where are the new players from?",
        "target": "Where",
        "cloze": "_____ are the new players from?",
        "promptHint": "Wh-",
        "options": [
          "Where",
          "What",
          "How",
          "When"
        ],
        "fa": "بازیکنان جدید اهل کجا هستند؟",
        "explainFa": "الگوی پرسش از کشور مبدأ «Where ... from?» است.",
        "chunks": [
          "What",
          "are the",
          "new players",
          "from?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Where",
        "flawedSentence": "What are the new players from?",
        "matchLeft": "___ are you from?",
        "matchRight": "Where",
        "noTyping": true
      },
      {
        "id": "p2_l1_4",
        "lesson": 1,
        "ruleTag": "پرسش ملیت با Are",
        "sentence": "Are those engineers Japanese? — Yes, they are from Tokyo.",
        "target": "Japanese",
        "cloze": "Are those engineers _____? — Yes, they are from Tokyo.",
        "promptHint": "nationality",
        "options": [
          "Japanese",
          "Japan",
          "from Japanese",
          "Japaneses"
        ],
        "fa": "آیا آن مهندسان ژاپنی هستند؟ — بله، اهل توکیو هستند.",
        "explainFa": "چون حرف اضافه «from» نداریم، صفت ملیت «Japanese» صحیح است.",
        "chunks": [
          "Are those engineers",
          "Japan?",
          "— Yes, they",
          "are from Tokyo."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "Japanese?",
        "flawedSentence": "Are those engineers Japan? — Yes, they are from Tokyo.",
        "matchLeft": "صفت ملیت Japan",
        "matchRight": "Japanese",
        "noTyping": true
      },
      {
        "id": "p2_l1_5",
        "lesson": 1,
        "ruleTag": "کشور چین بعد از from",
        "sentence": "Mr. Wang is a tourist from China.",
        "target": "China",
        "cloze": "Mr. Wang is a tourist from _____.",
        "promptHint": "country name",
        "options": [
          "China",
          "Chinese",
          "a China",
          "Chineses"
        ],
        "fa": "آقای وانگ گردشگری از کشور چین است.",
        "explainFa": "بعد از «from» نام کشور «China» می‌آید، نه «Chinese».",
        "chunks": [
          "Mr. Wang is",
          "a tourist",
          "from",
          "Chinese."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "China.",
        "flawedSentence": "Mr. Wang is a tourist from Chinese.",
        "matchLeft": "from + ___ (چین)",
        "matchRight": "China",
        "noTyping": true
      },
      {
        "id": "p2_l2_1",
        "lesson": 2,
        "ruleTag": "حرف اضافه روزهای هفته",
        "sentence": "We have English classes on Mondays and Wednesdays.",
        "target": "on",
        "cloze": "We have English classes _____ Mondays and Wednesdays.",
        "promptHint": "prep",
        "options": [
          "on",
          "in",
          "at",
          "from"
        ],
        "fa": "ما دوشنبه‌ها و چهارشنبه‌ها کلاس زبان داریم.",
        "explainFa": "قبل از تمام روزهای هفته حرف اضافه «on» به کار می‌رود.",
        "chunks": [
          "We have",
          "English classes",
          "in",
          "Mondays and Wednesdays."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "on",
        "flawedSentence": "We have English classes in Mondays and Wednesdays.",
        "matchLeft": "___ Fridays",
        "matchRight": "on",
        "noTyping": true
      },
      {
        "id": "p2_l2_2",
        "lesson": 2,
        "ruleTag": "حرف اضافه بخش‌های روز",
        "sentence": "My father reads the newspaper in the morning.",
        "target": "in",
        "cloze": "My father reads the newspaper _____ the morning.",
        "promptHint": "prep",
        "options": [
          "in",
          "on",
          "at",
          "by"
        ],
        "fa": "پدرم صبح‌ها روزنامه می‌خواند.",
        "explainFa": "قبل از «the morning / the afternoon / the evening» حرف اضافه «in» می‌آید.",
        "chunks": [
          "My father",
          "reads the newspaper",
          "at",
          "the morning."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My father reads the newspaper at the morning.",
        "matchLeft": "___ the afternoon",
        "matchRight": "in",
        "noTyping": true
      },
      {
        "id": "p2_l2_3",
        "lesson": 2,
        "ruleTag": "پرسش برنامه هفتگی",
        "sentence": "What do you usually do on the weekend?",
        "target": "do",
        "cloze": "What _____ you usually do on the weekend?",
        "promptHint": "do / does",
        "options": [
          "do",
          "does",
          "are",
          "is"
        ],
        "fa": "معمولاً آخر هفته چه کار می‌کنی؟",
        "explainFa": "برای فاعل «you» در زمان حال ساده از فعل کمکی «do» استفاده می‌کنیم.",
        "chunks": [
          "What",
          "are",
          "you usually do",
          "on the weekend?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "What are you usually do on the weekend?",
        "matchLeft": "What ___ you do?",
        "matchRight": "do"
      },
      {
        "id": "p2_l2_4",
        "lesson": 2,
        "ruleTag": "کارهای روزهای هفته weekdays",
        "sentence": "Students go to school on weekdays.",
        "target": "on",
        "cloze": "Students go to school _____ weekdays.",
        "promptHint": "on weekdays",
        "options": [
          "on",
          "in",
          "at",
          "to"
        ],
        "fa": "دانش‌آموزان در روزهای کاری هفته به مدرسه می‌روند.",
        "explainFa": "عبارت «weekdays» مانند روزهای هفته حرف اضافه «on» می‌گیرد.",
        "chunks": [
          "Students go",
          "to school",
          "in",
          "weekdays."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "on",
        "flawedSentence": "Students go to school in weekdays.",
        "matchLeft": "___ weekdays",
        "matchRight": "on"
      },
      {
        "id": "p2_l2_5",
        "lesson": 2,
        "ruleTag": "سوم‌شخص مفرد در برنامه هفتگی",
        "sentence": "Saeed goes to the gym every Tuesday afternoon.",
        "target": "goes",
        "cloze": "Saeed _____ to the gym every Tuesday afternoon.",
        "promptHint": "3rd person -es",
        "options": [
          "goes",
          "go",
          "going",
          "is go"
        ],
        "fa": "سعید هر سه‌شنبه بعدازظهر به باشگاه ورزشی می‌رود.",
        "explainFa": "فاعل مفرد «Saeed» با نشانه تکرار «every Tuesday» فعل «goes» می‌گیرد.",
        "chunks": [
          "Saeed",
          "go",
          "to the gym",
          "every Tuesday afternoon."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "goes",
        "flawedSentence": "Saeed go to the gym every Tuesday afternoon.",
        "matchLeft": "He ___ every week.",
        "matchRight": "goes",
        "noTyping": true
      },
      {
        "id": "p2_l3_1",
        "lesson": 3,
        "ruleTag": "فعل ساده بعد از can",
        "sentence": "My older sister can search the web very fast.",
        "target": "search",
        "cloze": "My older sister can _____ the web very fast.",
        "promptHint": "base verb",
        "options": [
          "search",
          "searches",
          "to search",
          "searching"
        ],
        "fa": "خواهر بزرگ‌ترم می‌تواند خیلی سریع در وب جستجو کند.",
        "explainFa": "بعد از «can / can't» فعل همواره به صورت ساده (بدون s و بدون to) می‌آید.",
        "chunks": [
          "My older",
          "sister can",
          "searches",
          "the web very fast."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "search",
        "flawedSentence": "My older sister can searches the web very fast.",
        "matchLeft": "She can ___.",
        "matchRight": "search (فعل ساده)",
        "noTyping": true
      },
      {
        "id": "p2_l3_2",
        "lesson": 3,
        "ruleTag": "مفهوم توانایی منفی can't",
        "sentence": "Little Ali is only two years old, so he can't read books.",
        "target": "can't",
        "cloze": "Little Ali is only two years old, so he _____ read books.",
        "promptHint": "can / can't",
        "options": [
          "can't",
          "doesn't can",
          "can",
          "isn't"
        ],
        "fa": "علیِ کوچک فقط دو سالش است، بنابراین نمی‌تواند کتاب بخواند.",
        "explainFa": "با توجه به سن دو سال، عدم توانایی با «can't» بیان می‌شود.",
        "chunks": [
          "Little Ali is only",
          "two years old, so he",
          "doesn't can",
          "read books."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "can't",
        "flawedSentence": "Little Ali is only two years old, so he doesn't can read books.",
        "matchLeft": "عدم توانایی",
        "matchRight": "can't + فعل ساده"
      },
      {
        "id": "p2_l3_3",
        "lesson": 3,
        "ruleTag": "پرسش توانایی با Can",
        "sentence": "Can your grandfather work with a computer?",
        "target": "Can",
        "cloze": "_____ your grandfather work with a computer?",
        "promptHint": "modal",
        "options": [
          "Can",
          "Is",
          "Are",
          "Can to"
        ],
        "fa": "آیا پدربزرگت می‌تواند با رایانه کار کند؟",
        "explainFa": "با وجود فعل ساده «work» و مفهوم مهارت، «Can» صحیح است.",
        "chunks": [
          "Is",
          "your grandfather",
          "work with",
          "a computer?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Can",
        "flawedSentence": "Is your grandfather work with a computer?",
        "matchLeft": "___ you swim?",
        "matchRight": "Can",
        "noTyping": true
      },
      {
        "id": "p2_l3_4",
        "lesson": 3,
        "ruleTag": "پرسش چه کسی با Who can",
        "sentence": "Who can recite the Holy Quran beautifully in your class?",
        "target": "can recite",
        "cloze": "Who _____ the Holy Quran beautifully in your class?",
        "promptHint": "Who can + V",
        "options": [
          "can recite",
          "can recites",
          "can to recite",
          "is recite"
        ],
        "fa": "چه کسی در کلاس شما می‌تواند قرآن کریم را زیبا تلاوت کند؟",
        "explainFa": "بعد از «Who can» فعل اصلی بدون هیچ پسوندی می‌آید: «can recite».",
        "chunks": [
          "Who",
          "can recites",
          "the Holy Quran beautifully",
          "in your class?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "can recite",
        "flawedSentence": "Who can recites the Holy Quran beautifully in your class?",
        "matchLeft": "Who can ___?",
        "matchRight": "recite (ساده)"
      },
      {
        "id": "p2_l3_5",
        "lesson": 3,
        "ruleTag": "توانایی نوشتن شعر",
        "sentence": "Parvin can tell good jokes, but she can't write poems.",
        "target": "write",
        "cloze": "Parvin can tell good jokes, but she can't _____ poems.",
        "promptHint": "after can't",
        "options": [
          "write",
          "writes",
          "writing",
          "to write"
        ],
        "fa": "پروین می‌تواند لطیفه‌های خوبی بگوید، اما نمی‌تواند شعر بسراید.",
        "explainFa": "پس از «can't» نیز شکل ساده فعل (write) به کار می‌رود.",
        "chunks": [
          "Parvin can tell good",
          "jokes, but she can't",
          "writes",
          "poems."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "write",
        "flawedSentence": "Parvin can tell good jokes, but she can't writes poems.",
        "matchLeft": "can't + ___",
        "matchRight": "write (ساده)",
        "noTyping": true
      },
      {
        "id": "p2_l4_1",
        "lesson": 4,
        "ruleTag": "توصیه سلامتی با should",
        "sentence": "You have a bad fever; you should rest in bed today.",
        "target": "should",
        "cloze": "You have a bad fever; you _____ rest in bed today.",
        "promptHint": "advice",
        "options": [
          "should",
          "should to",
          "must to",
          "are"
        ],
        "fa": "تب شدیدی داری؛ امروز باید در رختخواب استراحت کنی.",
        "explainFa": "برای توصیه پزشکی از «should + شکل ساده فعل» استفاده می‌کنیم.",
        "chunks": [
          "You have a",
          "bad fever; you",
          "should to",
          "rest in bed today."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "should",
        "flawedSentence": "You have a bad fever; you should to rest in bed today.",
        "matchLeft": "توصیه مثبت پزشکی",
        "matchRight": "should + فعل ساده",
        "noTyping": true
      },
      {
        "id": "p2_l4_2",
        "lesson": 4,
        "ruleTag": "بیان بیماری با have/has",
        "sentence": "Mina can't come to school because she has a sore throat.",
        "target": "has",
        "cloze": "Mina can't come to school because she _____ a sore throat.",
        "promptHint": "have / has",
        "options": [
          "has",
          "have",
          "having",
          "is have"
        ],
        "fa": "مینا نمی‌تواند به مدرسه بیاید چون گلودرد دارد.",
        "explainFa": "فاعل «she» سوم‌شخص مفرد است، پس «has» می‌آید: «she has a sore throat».",
        "chunks": [
          "Mina can't come to",
          "school because she",
          "have",
          "a sore throat."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "has",
        "flawedSentence": "Mina can't come to school because she have a sore throat.",
        "matchLeft": "She ___ a headache.",
        "matchRight": "has"
      },
      {
        "id": "p2_l4_3",
        "lesson": 4,
        "ruleTag": "پرسش از مشکل سلامتی",
        "sentence": "You look pale! What's wrong with you?",
        "target": "wrong",
        "cloze": "You look pale! What's _____ with you?",
        "promptHint": "health pattern",
        "options": [
          "wrong",
          "matter",
          "problem",
          "the wrong"
        ],
        "fa": "رنگ‌پریده به نظر می‌رسی! مشکلت چیست؟",
        "explainFa": "عبارت ثابت «What's wrong with you?» است؛ با «matter» حتماً «the» لازم است: «What's the matter?». «What's problem» و «the wrong» غلط‌اند.",
        "chunks": [
          "You look pale!",
          "What's",
          "matter",
          "with you?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "wrong",
        "flawedSentence": "You look pale! What's matter with you?",
        "matchLeft": "What's ___ with you?",
        "matchRight": "wrong",
        "noTyping": true
      },
      {
        "id": "p2_l4_4",
        "lesson": 4,
        "ruleTag": "توصیه منفی shouldn't",
        "sentence": "You have a bad backache; you shouldn't lift heavy boxes.",
        "target": "shouldn't lift",
        "cloze": "You have a bad backache; you _____ heavy boxes.",
        "promptHint": "negative advice",
        "options": [
          "shouldn't lift",
          "should lift",
          "shouldn't to lift",
          "don't should lift"
        ],
        "fa": "کمردرد شدیدی داری؛ نباید جعبه‌های سنگین بلند کنی.",
        "explainFa": "توصیه بازدارنده پزشکی با «shouldn't + فعل ساده» بیان می‌شود.",
        "chunks": [
          "You have a",
          "bad backache; you",
          "shouldn't to lift",
          "heavy boxes."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "shouldn't lift",
        "flawedSentence": "You have a bad backache; you shouldn't to lift heavy boxes.",
        "matchLeft": "نباید بلند کنی",
        "matchRight": "shouldn't lift",
        "noTyping": true
      },
      {
        "id": "p2_l4_5",
        "lesson": 4,
        "ruleTag": "بیان سرماخوردگی have a cold",
        "sentence": "I can't go to school today; I have a cold and a fever.",
        "target": "a cold",
        "cloze": "I can't go to school today; I have _____ and a fever.",
        "promptHint": "health idiom",
        "options": [
          "a cold",
          "cold",
          "an cold",
          "colds"
        ],
        "fa": "امروز نمی‌توانم به مدرسه بروم؛ سرما خورده‌ام و تب دارم.",
        "explainFa": "«cold» (سرماخوردگی) قابل‌شمارش است: «have a cold». در فارسی «سرما خورده‌ام» می‌گوییم و برای همین گاهی «a» جا می‌افتد.",
        "chunks": [
          "I can't go to",
          "school today; I have",
          "cold",
          "and a fever."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "a cold",
        "flawedSentence": "I can't go to school today; I have cold and a fever.",
        "matchLeft": "I have ___ and a fever.",
        "matchRight": "a cold",
        "noTyping": true
      },
      {
        "id": "p2_l5_1",
        "lesson": 5,
        "ruleTag": "وجود جمع There are",
        "sentence": "There are many historical bridges in Isfahan.",
        "target": "There are",
        "cloze": "_____ many historical bridges in Isfahan.",
        "promptHint": "There is/are",
        "options": [
          "There are",
          "There is",
          "They are",
          "It is"
        ],
        "fa": "پل‌های تاریخی زیادی در اصفهان وجود دارد.",
        "explainFa": "چون «many historical bridges» جمع است، «There are» صحیح است.",
        "chunks": [
          "There is",
          "many historical",
          "bridges in",
          "Isfahan."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "There are",
        "flawedSentence": "There is many historical bridges in Isfahan.",
        "matchLeft": "___ many parks.",
        "matchRight": "There are"
      },
      {
        "id": "p2_l5_2",
        "lesson": 5,
        "ruleTag": "پرسش وجود مفرد Is there",
        "sentence": "Excuse me, is there a post office near this square?",
        "target": "is there",
        "cloze": "Excuse me, _____ a post office near this square?",
        "promptHint": "question",
        "options": [
          "is there",
          "are there",
          "there is",
          "is it"
        ],
        "fa": "ببخشید، آیا اداره پستی نزدیک این میدان وجود دارد؟",
        "explainFa": "در حالت سؤالی برای اسم مفرد (a post office) جای فعل و There عوض می‌شود: «is there».",
        "chunks": [
          "Excuse me,",
          "there is",
          "a post office",
          "near this square?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is there",
        "flawedSentence": "Excuse me, there is a post office near this square?",
        "matchLeft": "___ a bank here?",
        "matchRight": "Is there",
        "noTyping": true
      },
      {
        "id": "p2_l5_3",
        "lesson": 5,
        "ruleTag": "نفی جمع There aren't",
        "sentence": "There aren't any tall buildings in our quiet village.",
        "target": "aren't",
        "cloze": "There _____ any tall buildings in our quiet village.",
        "promptHint": "negation",
        "options": [
          "aren't",
          "isn't",
          "haven't",
          "not are"
        ],
        "fa": "هیچ ساختمان بلندی در روستای آرام ما وجود ندارد.",
        "explainFa": "همراه اسم جمع «any tall buildings» شکل منفی «aren't» به کار می‌رود.",
        "chunks": [
          "There",
          "isn't",
          "any tall buildings in",
          "our quiet village."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "aren't",
        "flawedSentence": "There isn't any tall buildings in our quiet village.",
        "matchLeft": "There ___ any trees.",
        "matchRight": "aren't",
        "noTyping": true
      },
      {
        "id": "p2_l5_4",
        "lesson": 5,
        "ruleTag": "وجود مفرد There is",
        "sentence": "There is an old castle on top of that hill.",
        "target": "There is",
        "cloze": "_____ an old castle on top of that hill.",
        "promptHint": "singular there",
        "options": [
          "There is",
          "There are",
          "They are",
          "Are there"
        ],
        "fa": "یک قلعه قدیمی بر فراز آن تپه وجود دارد.",
        "explainFa": "چون «an old castle» مفرد است، از «There is» استفاده می‌شود.",
        "chunks": [
          "There are",
          "an old castle",
          "on top of",
          "that hill."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "There is",
        "flawedSentence": "There are an old castle on top of that hill.",
        "matchLeft": "___ an airport.",
        "matchRight": "There is"
      },
      {
        "id": "p2_l5_5",
        "lesson": 5,
        "ruleTag": "پرسش جمع Are there any",
        "sentence": "Are there any good bookstores on Ferdowsi Street?",
        "target": "Are there",
        "cloze": "_____ any good bookstores on Ferdowsi Street?",
        "promptHint": "plural question",
        "options": [
          "Are there",
          "Is there",
          "There are",
          "Do there"
        ],
        "fa": "آیا کتاب‌فروشی خوبی در خیابان فردوسی هست؟",
        "explainFa": "همراه «any + اسم جمع (bookstores)» در پرسش، «Are there» صحیح است.",
        "chunks": [
          "Is there",
          "any good",
          "bookstores on",
          "Ferdowsi Street?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Are there",
        "flawedSentence": "Is there any good bookstores on Ferdowsi Street?",
        "matchLeft": "___ any hospitals?",
        "matchRight": "Are there",
        "noTyping": true
      },
      {
        "id": "p2_l6_1",
        "lesson": 6,
        "ruleTag": "الگوی پرسش آب‌وهوا",
        "sentence": "What is the weather like in Tabriz in winter?",
        "target": "What",
        "cloze": "_____ is the weather like in Tabriz in winter?",
        "promptHint": "What / How",
        "options": [
          "What",
          "How",
          "Where",
          "When"
        ],
        "fa": "هوای تبریز در زمستان چطور است؟",
        "explainFa": "وقتی در انتهای عبارت «like» وجود دارد، کلمه پرسشی حتماً «What» است.",
        "chunks": [
          "How",
          "is the weather",
          "like in",
          "Tabriz in winter?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "What",
        "flawedSentence": "How is the weather like in Tabriz in winter?",
        "matchLeft": "___ is the weather like?",
        "matchRight": "What"
      },
      {
        "id": "p2_l6_2",
        "lesson": 6,
        "ruleTag": "بیان وضعیت هوا با It's",
        "sentence": "Take your umbrella! It is cold and rainy outside.",
        "target": "It is",
        "cloze": "Take your umbrella! _____ cold and rainy outside.",
        "promptHint": "weather subj",
        "options": [
          "It is",
          "There is",
          "It",
          "They are"
        ],
        "fa": "چترت را بردار! بیرون هوا سرد و بارانی است.",
        "explainFa": "در توصیف آب‌وهوا همراه صفات (cold, rainy) از ضمیر «It is» استفاده می‌کنیم.",
        "chunks": [
          "Take your umbrella!",
          "There is",
          "cold and",
          "rainy outside."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "It is",
        "flawedSentence": "Take your umbrella! There is cold and rainy outside.",
        "matchLeft": "___ sunny today.",
        "matchRight": "It is",
        "noTyping": true
      },
      {
        "id": "p2_l6_3",
        "lesson": 6,
        "ruleTag": "حرف اضافه فصل‌ها",
        "sentence": "Our village is very green and pleasant in spring.",
        "target": "in",
        "cloze": "Our village is very green and pleasant _____ spring.",
        "promptHint": "prep",
        "options": [
          "in",
          "on",
          "at",
          "by"
        ],
        "fa": "روستای ما در فصل بهار بسیار سرسبز و دل‌پذیر است.",
        "explainFa": "قبل از نام هر چهار فصل سال حرف اضافه «in» می‌آید.",
        "chunks": [
          "Our village is very",
          "green and pleasant",
          "on",
          "spring."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "Our village is very green and pleasant on spring.",
        "matchLeft": "___ winter / summer",
        "matchRight": "in",
        "noTyping": true
      },
      {
        "id": "p2_l6_4",
        "lesson": 6,
        "ruleTag": "پرسش هوا با What … like (نه How … like)",
        "sentence": "What is the weather like in Shiraz today? — It's mild and sunny.",
        "target": "What",
        "cloze": "_____ is the weather like in Shiraz today? — It's mild and sunny.",
        "promptHint": "What … like",
        "options": [
          "What",
          "How",
          "Where",
          "Who"
        ],
        "fa": "امروز هوای شیراز چطور است؟ — معتدل و آفتابی است.",
        "explainFa": "یا «What is the weather like?» یا «How is the weather?»؛ ترکیب «How … like» غلط است. چون در فارسی «چطور» را «How» ترجمه می‌کنیم، این اشتباه رایج است.",
        "chunks": [
          "How",
          "is the weather",
          "like in Shiraz",
          "today? — It's",
          "mild and sunny."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "What",
        "flawedSentence": "How is the weather like in Shiraz today? — It's mild and sunny.",
        "matchLeft": "___ is the weather like?",
        "matchRight": "What"
      },
      {
        "id": "p2_l6_5",
        "lesson": 6,
        "ruleTag": "وضعیت هوای کوهستانی",
        "sentence": "It usually snows a lot in mountainous villages in winter.",
        "target": "snows",
        "cloze": "It usually _____ a lot in mountainous villages in winter.",
        "promptHint": "weather verb",
        "options": [
          "snows",
          "snow",
          "snowy",
          "is snowy"
        ],
        "fa": "در زمستان معمولاً در روستاهای کوهستانی زیاد برف می‌بارد.",
        "explainFa": "در اینجا قید تکرار «usually» و قید مقدار «a lot» نشان می‌دهند به فعل «snows» نیاز داریم (نه صفت snowy).",
        "chunks": [
          "It usually",
          "snowy",
          "a lot in mountainous",
          "villages in winter."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "snows",
        "flawedSentence": "It usually snowy a lot in mountainous villages in winter.",
        "matchLeft": "It usually ___ (فعل).",
        "matchRight": "snows / rains",
        "noTyping": true
      },
      {
        "id": "p2_l7_1",
        "lesson": 7,
        "ruleTag": "حرف اضافه + اسم مصدر",
        "sentence": "My brother is very interested in taking nature photos.",
        "target": "taking",
        "cloze": "My brother is very interested in _____ nature photos.",
        "promptHint": "in + V-ing",
        "options": [
          "taking",
          "take",
          "to take",
          "takes"
        ],
        "fa": "برادرم به عکاسی از طبیعت بسیار علاقه‌مند است.",
        "explainFa": "فراتر از کتاب — اگر پس از «interested in» فعل بیاوریم، فعل به شکل «-ing» می‌آید.",
        "chunks": [
          "My brother is",
          "very interested in",
          "take",
          "nature photos."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "taking",
        "flawedSentence": "My brother is very interested in take nature photos.",
        "matchLeft": "interested in + ___",
        "matchRight": "V-ing",
        "noTyping": true
      },
      {
        "id": "p2_l7_2",
        "lesson": 7,
        "ruleTag": "فعل enjoy + V-ing",
        "sentence": "We really enjoy walking in the park in our free time.",
        "target": "walking",
        "cloze": "We really enjoy _____ in the park in our free time.",
        "promptHint": "enjoy + V-ing",
        "options": [
          "walking",
          "to walk",
          "walk",
          "walks"
        ],
        "fa": "ما واقعاً از پیاده‌روی در پارک در اوقات فراغتمان لذت می‌بریم.",
        "explainFa": "اگر پس از «enjoy» فعل دیگری بیاوریم، آن فعل به شکل «V-ing» می‌آید.",
        "chunks": [
          "We really enjoy",
          "to walk",
          "in the park in",
          "our free time."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "walking",
        "flawedSentence": "We really enjoy to walk in the park in our free time.",
        "matchLeft": "enjoy + ___",
        "matchRight": "walking (V-ing)",
        "noTyping": true
      },
      {
        "id": "p2_l7_3",
        "lesson": 7,
        "ruleTag": "مهارت با good at",
        "sentence": "Zahra is very good at cooking traditional Iranian food.",
        "target": "at",
        "cloze": "Zahra is very good _____ cooking traditional Iranian food.",
        "promptHint": "good at",
        "options": [
          "at",
          "in",
          "on",
          "for"
        ],
        "fa": "زهرا در پختن غذاهای سنتی ایرانی بسیار ماهر است.",
        "explainFa": "درس ۳ کتاب (ص ۲۶–۲۷) — برای بیان مهارت در این الگو، «good at + V-ing» ساخت رایج است.",
        "chunks": [
          "Zahra is",
          "very good",
          "in",
          "cooking traditional Iranian food."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "Zahra is very good in cooking traditional Iranian food.",
        "matchLeft": "good ___ + V-ing",
        "matchRight": "at"
      },
      {
        "id": "p2_l7_4",
        "lesson": 7,
        "ruleTag": "سرگرمی با like + V-ing",
        "sentence": "What do you like doing in your free time?",
        "target": "doing",
        "cloze": "What do you like _____ in your free time?",
        "promptHint": "like + V-ing",
        "options": [
          "doing",
          "do",
          "does",
          "did"
        ],
        "fa": "دوست داری در اوقات فراغتت چه کار کنی؟",
        "explainFa": "پس از فعل «like» برای بیان سرگرمی‌ها از شکل «V-ing» استفاده می‌کنیم.",
        "chunks": [
          "What do you",
          "like",
          "do",
          "in your free time?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "doing",
        "flawedSentence": "What do you like do in your free time?",
        "matchLeft": "like + ___ (سرگرمی)",
        "matchRight": "doing (V-ing)",
        "noTyping": true
      },
      {
        "id": "p2_l7_5",
        "lesson": 7,
        "ruleTag": "نفرت از کاری با hate + V-ing",
        "sentence": "My brother hates waking up late on holidays.",
        "target": "waking",
        "cloze": "My brother hates _____ up late on holidays.",
        "promptHint": "hate + V-ing",
        "options": [
          "waking",
          "wake",
          "wakes",
          "woke"
        ],
        "fa": "برادرم از دیر بیدار شدن در روزهای تعطیل بیزار است.",
        "explainFa": "بعد از «love, like, enjoy, hate» شکل «V-ing» می‌آید.",
        "chunks": [
          "My brother hates",
          "wake",
          "up late",
          "on holidays."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "waking",
        "flawedSentence": "My brother hates wake up late on holidays.",
        "matchLeft": "hate + ___",
        "matchRight": "waking (V-ing)",
        "noTyping": true
      },
      {
        "id": "p2_l1_6",
        "lesson": 1,
        "ruleTag": "توافق is با کشور",
        "sentence": "My cousin is from Italy.",
        "target": "is",
        "cloze": "My cousin _____ from Italy.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "پسرعموی من از ایتالیا است.",
        "explainFa": "«My cousin» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "My",
          "cousin",
          "are",
          "from Italy."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My cousin are from Italy.",
        "matchLeft": "My cousin",
        "matchRight": "is from Italy",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l1_7",
        "lesson": 1,
        "ruleTag": "توافق are با گروه",
        "sentence": "They are from Germany.",
        "target": "are",
        "cloze": "They _____ from Germany.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها از آلمان هستند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "from",
          "Germany."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is from Germany.",
        "matchLeft": "They",
        "matchRight": "are from Germany",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l1_8",
        "lesson": 1,
        "ruleTag": "ملیت به‌جای نام کشور",
        "sentence": "She is French and she lives in France.",
        "target": "French",
        "cloze": "She is _____ and she lives in France.",
        "promptHint": "country",
        "options": [
          "French",
          "France",
          "a French",
          "the France"
        ],
        "fa": "او فرانسوی است و در فرانسه زندگی می‌کند.",
        "explainFa": "بدون «from» از صفت ملیت «French» استفاده می‌کنیم، نه نام کشور «France».",
        "chunks": [
          "She is",
          "France",
          "and she lives",
          "in France."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "French",
        "flawedSentence": "She is France and she lives in France.",
        "matchLeft": "She is",
        "matchRight": "French and she lives in France",
        "noTyping": true
      },
      {
        "id": "p2_l1_9",
        "lesson": 1,
        "ruleTag": "پرسش از کشور مفرد",
        "sentence": "Where is your teacher from?",
        "target": "is",
        "cloze": "Where _____ your teacher from?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "do"
        ],
        "fa": "معلمت اهل کجاست؟",
        "explainFa": "«your teacher» مفرد است، پس «is» می‌گیرد.",
        "chunks": [
          "Where",
          "are",
          "your teacher",
          "from?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Where are your teacher from?",
        "matchLeft": "Where",
        "matchRight": "is your teacher from",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l1_10",
        "lesson": 1,
        "ruleTag": "صفت ملیت بدون from در جمله",
        "sentence": "My uncle is Egyptian.",
        "target": "is",
        "cloze": "My uncle _____ Egyptian.",
        "promptHint": "be",
        "options": [
          "is",
          "is from",
          "are",
          "am"
        ],
        "fa": "عمویم مصری است.",
        "explainFa": "برای این فاعل مفرد می‌گوییم «is Egyptian» و برای بیان مبدأ می‌توان گفت «from Egypt»؛ «from» پیش از نام مکان‌های دیگر نیز می‌آید.",
        "chunks": [
          "My",
          "uncle",
          "is from",
          "Egyptian."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "My uncle is from Egyptian.",
        "matchLeft": "My uncle",
        "matchRight": "is Egyptian",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l1_11",
        "lesson": 1,
        "ruleTag": "جمع با are و from",
        "sentence": "Those girls are from Turkey.",
        "target": "are",
        "cloze": "Those girls _____ from Turkey.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن دخترها از ترکیه هستند.",
        "explainFa": "«Those girls» جمع است و «are» می‌گیرد.",
        "chunks": [
          "Those",
          "girls",
          "is",
          "from Turkey."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "are",
        "flawedSentence": "Those girls is from Turkey.",
        "matchLeft": "Those girls",
        "matchRight": "are from Turkey",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l1_12",
        "lesson": 1,
        "ruleTag": "منشأ با am",
        "sentence": "I am from Iran.",
        "target": "am",
        "cloze": "I _____ from Iran.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من از ایران هستم.",
        "explainFa": "«I» با «am» می‌آید و پس از «from» نام کشور می‌آید.",
        "chunks": [
          "I",
          "is",
          "from",
          "Iran."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is from Iran.",
        "matchLeft": "I",
        "matchRight": "am from Iran"
      },
      {
        "id": "p2_l1_13",
        "lesson": 1,
        "ruleTag": "پرسش از کشور همسایه‌ها",
        "sentence": "Where are your neighbors from?",
        "target": "are",
        "cloze": "Where _____ your neighbors from?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "do"
        ],
        "fa": "همسایه‌هایت اهل کجا هستند؟",
        "explainFa": "«your neighbors» جمع است، پس «are» می‌گیرد.",
        "chunks": [
          "Where",
          "is",
          "your neighbors",
          "from?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "Where is your neighbors from?",
        "matchLeft": "Where",
        "matchRight": "are your neighbors from",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l1_14",
        "lesson": 1,
        "ruleTag": "ملیت بدون from در جمله",
        "sentence": "My sister is Chinese and she studies in Beijing.",
        "target": "Chinese",
        "cloze": "My sister is _____ and she studies in Beijing.",
        "promptHint": "country",
        "options": [
          "Chinese",
          "China",
          "a Chinese",
          "Chineses"
        ],
        "fa": "خواهرم چینی است و در پکن تحصیل می‌کند.",
        "explainFa": "بدون «from» صفت ملیت «Chinese» به‌کار می‌رود، نه نام کشور «China».",
        "chunks": [
          "My sister is",
          "China",
          "and she studies",
          "in Beijing."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "Chinese",
        "flawedSentence": "My sister is China and she studies in Beijing.",
        "matchLeft": "My sister is",
        "matchRight": "Chinese and she studies in Beijing",
        "noTyping": true
      },
      {
        "id": "p2_l1_15",
        "lesson": 1,
        "ruleTag": "ملیت با اسم جمع",
        "sentence": "They are Brazilian football players.",
        "target": "are",
        "cloze": "They _____ Brazilian football players.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها بازیکنان فوتبال برزیلی هستند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "Brazilian football",
          "players."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is Brazilian football players.",
        "matchLeft": "They",
        "matchRight": "are Brazilian football players",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l2_6",
        "lesson": 2,
        "ruleTag": "برنامهٔ جمع با have",
        "sentence": "We have English classes on Sundays.",
        "target": "have",
        "cloze": "We _____ English classes on Sundays.",
        "promptHint": "do",
        "options": [
          "have",
          "has",
          "having",
          "are have"
        ],
        "fa": "ما کلاس‌های انگلیسی در روزهای یکشنبه داریم.",
        "explainFa": "«We» جمع است، پس «have» می‌گیرد.",
        "chunks": [
          "We",
          "has",
          "English classes",
          "on Sundays."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have",
        "flawedSentence": "We has English classes on Sundays.",
        "matchLeft": "We",
        "matchRight": "have English classes",
        "noTyping": true
      },
      {
        "id": "p2_l2_7",
        "lesson": 2,
        "ruleTag": "سوم‌شخص مفرد go",
        "sentence": "My sister goes to music school on Thursdays.",
        "target": "goes",
        "cloze": "My sister _____ to music school on Thursdays.",
        "promptHint": "go",
        "options": [
          "goes",
          "go",
          "going",
          "gone"
        ],
        "fa": "خواهرم پنجشنبه‌ها به مدرسهٔ موسیقی می‌رود.",
        "explainFa": "برای سوم‌شخص مفرد در زمان حال ساده فعل «-s» می‌گیرد.",
        "chunks": [
          "My sister",
          "go",
          "to music school",
          "on Thursdays."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "goes",
        "flawedSentence": "My sister go to music school on Thursdays.",
        "matchLeft": "My sister",
        "matchRight": "goes to music school"
      },
      {
        "id": "p2_l2_8",
        "lesson": 2,
        "ruleTag": "روز هفته با on",
        "sentence": "What do you usually do on Fridays?",
        "target": "on",
        "cloze": "What do you usually do _____ Fridays?",
        "promptHint": "in / on / at",
        "options": [
          "on",
          "in",
          "at",
          "for"
        ],
        "fa": "معمولاً جمعه‌ها چه کار می‌کنی؟",
        "explainFa": "قبل از نام روزهای هفته «on» می‌آید.",
        "chunks": [
          "What do you",
          "usually do",
          "in",
          "Fridays?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "on",
        "flawedSentence": "What do you usually do in Fridays?",
        "matchLeft": "What do you usually do",
        "matchRight": "on Fridays"
      },
      {
        "id": "p2_l2_9",
        "lesson": 2,
        "ruleTag": "وعدهٔ غذایی با have",
        "sentence": "They have lunch at home every day.",
        "target": "have",
        "cloze": "They _____ lunch at home every day.",
        "promptHint": "do",
        "options": [
          "have",
          "has",
          "having",
          "are have"
        ],
        "fa": "آن‌ها هر روز در خانه ناهار می‌خورند.",
        "explainFa": "«They» جمع است، پس «have» می‌گیرد.",
        "chunks": [
          "They",
          "has",
          "lunch at home",
          "every day."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have",
        "flawedSentence": "They has lunch at home every day.",
        "matchLeft": "They",
        "matchRight": "have lunch at home",
        "noTyping": true
      },
      {
        "id": "p2_l2_10",
        "lesson": 2,
        "ruleTag": "فعل ساده با I",
        "sentence": "I visit my grandparents every weekend.",
        "target": "visit",
        "cloze": "I _____ my grandparents every weekend.",
        "promptHint": "visit (شکل درست)",
        "options": [
          "visit",
          "visits",
          "visiting",
          "am visit"
        ],
        "fa": "من هر آخر هفته به پدربزرگ و مادربزرگم سر می‌زنم.",
        "explainFa": "بعد از «I» فعل به شکل ساده می‌آید.",
        "chunks": [
          "I",
          "visits",
          "my grandparents",
          "every weekend."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "visit",
        "flawedSentence": "I visits my grandparents every weekend.",
        "matchLeft": "I",
        "matchRight": "visit my grandparents",
        "altAnswers": [
          "visited"
        ]
      },
      {
        "id": "p2_l2_11",
        "lesson": 2,
        "ruleTag": "انجام تکلیف با do",
        "sentence": "The students do their homework after school.",
        "target": "do",
        "cloze": "The students _____ their homework after school.",
        "promptHint": "do (شکل درست)",
        "options": [
          "do",
          "does",
          "doing",
          "are do"
        ],
        "fa": "دانش‌آموزان بعد از مدرسه تکالیفشان را انجام می‌دهند.",
        "explainFa": "«The students» جمع است و «do» می‌گیرد.",
        "chunks": [
          "The students",
          "does",
          "their homework",
          "after school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "The students does their homework after school.",
        "matchLeft": "The students",
        "matchRight": "do their homework",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p2_l2_12",
        "lesson": 2,
        "ruleTag": "سوم‌شخص مفرد eat",
        "sentence": "He always eats his lunch at noon.",
        "target": "eats",
        "cloze": "He always _____ his lunch at noon.",
        "promptHint": "eat",
        "options": [
          "eats",
          "eat",
          "eating",
          "is eat"
        ],
        "fa": "او همیشه ناهارش را ساعت ۱۲ می‌خورد.",
        "explainFa": "«He» سوم‌شخص مفرد است، پس فعل «-s» می‌گیرد.",
        "chunks": [
          "He always",
          "eat",
          "his lunch",
          "at noon."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "eats",
        "flawedSentence": "He always eat his lunch at noon.",
        "matchLeft": "He",
        "matchRight": "always eats his lunch",
        "altAnswers": [
          "ate"
        ]
      },
      {
        "id": "p2_l2_13",
        "lesson": 2,
        "ruleTag": "زمان امتحان با is",
        "sentence": "Our English exam is in two weeks.",
        "target": "is",
        "cloze": "Our English exam _____ in two weeks.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "امتحان انگلیسی ما دو هفته دیگر است.",
        "explainFa": "«Our English exam» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "Our English",
          "exam",
          "are",
          "in two weeks."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "Our English exam are in two weeks.",
        "matchLeft": "Our English exam",
        "matchRight": "is in two weeks"
      },
      {
        "id": "p2_l2_14",
        "lesson": 2,
        "ruleTag": "فعل ساده با we",
        "sentence": "On Fridays we watch a movie at home.",
        "target": "watch",
        "cloze": "On Fridays we _____ a movie at home.",
        "promptHint": "watch (شکل درست)",
        "options": [
          "watch",
          "watches",
          "watching",
          "are watch"
        ],
        "fa": "جمعه‌ها در خانه فیلم می‌بینیم.",
        "explainFa": "بعد از «we» فعل به شکل ساده می‌آید.",
        "chunks": [
          "On Fridays we",
          "watches",
          "a movie",
          "at home."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "watch",
        "flawedSentence": "On Fridays we watches a movie at home.",
        "matchLeft": "On Fridays we",
        "matchRight": "watch a movie at home",
        "altAnswers": [
          "watched"
        ]
      },
      {
        "id": "p2_l2_15",
        "lesson": 2,
        "ruleTag": "بخش روز با in",
        "sentence": "My father usually reads in the evening.",
        "target": "in",
        "cloze": "My father usually reads _____ the evening.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "on",
          "at",
          "to"
        ],
        "fa": "پدرم معمولاً عصرها روزنامه می‌خواند.",
        "explainFa": "برای بخش‌های روز از «in» استفاده می‌کنیم.",
        "chunks": [
          "My father",
          "usually reads",
          "on",
          "the evening."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "My father usually reads on the evening.",
        "matchLeft": "My father usually reads",
        "matchRight": "in the evening"
      },
      {
        "id": "p2_l3_6",
        "lesson": 3,
        "ruleTag": "فعل ساده پس از can",
        "sentence": "She can play the piano very well.",
        "target": "play",
        "cloze": "She can _____ the piano very well.",
        "promptHint": "play (شکل درست)",
        "options": [
          "play",
          "plays",
          "playing",
          "to play"
        ],
        "fa": "او خیلی خوب پیانو می‌زند.",
        "explainFa": "بعد از «can» فعل اصلی همیشه ساده است: نه «-s» دارد و نه «to».",
        "chunks": [
          "She can",
          "plays",
          "the piano",
          "very well."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "play",
        "flawedSentence": "She can plays the piano very well.",
        "matchLeft": "She can",
        "matchRight": "play the piano"
      },
      {
        "id": "p2_l3_7",
        "lesson": 3,
        "ruleTag": "فعل ساده پس از can't",
        "sentence": "My brother can't drive a car yet.",
        "target": "drive",
        "cloze": "My brother can't _____ a car yet.",
        "promptHint": "drive (شکل درست)",
        "options": [
          "drive",
          "drives",
          "driving",
          "to drive"
        ],
        "fa": "برادرم هنوز نمی‌تواند ماشین براند.",
        "explainFa": "بعد از «can't» هم فعل به شکل ساده می‌آید.",
        "chunks": [
          "My brother",
          "can't",
          "drives",
          "a car yet."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "drive",
        "flawedSentence": "My brother can't drives a car yet.",
        "matchLeft": "My brother can't",
        "matchRight": "drive a car yet"
      },
      {
        "id": "p2_l3_8",
        "lesson": 3,
        "ruleTag": "کمک با can و فعل ساده",
        "sentence": "Can you help me with this homework?",
        "target": "help",
        "cloze": "Can you _____ me with this homework?",
        "promptHint": "help (شکل درست)",
        "options": [
          "help",
          "helps",
          "helping",
          "to help"
        ],
        "fa": "می‌توانی در این تکلیف کمکم کنی؟",
        "explainFa": "بعد از «can» فعل بدون «to» می‌آید.",
        "chunks": [
          "Can you",
          "helps",
          "me with",
          "this homework?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "help",
        "flawedSentence": "Can you helps me with this homework?",
        "matchLeft": "Can you",
        "matchRight": "help me with this homework"
      },
      {
        "id": "p2_l3_9",
        "lesson": 3,
        "ruleTag": "شنا با can",
        "sentence": "We can swim in the river in summer.",
        "target": "swim",
        "cloze": "We can _____ in the river in summer.",
        "promptHint": "swim (شکل درست)",
        "options": [
          "swim",
          "swims",
          "swimming",
          "to swim"
        ],
        "fa": "ما در تابستان می‌توانیم در رودخانه شنا کنیم.",
        "explainFa": "بعد از «can» شکل سادهٔ فعل به‌کار می‌رود.",
        "chunks": [
          "We can",
          "swims",
          "in the river",
          "in summer."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "swim",
        "flawedSentence": "We can swims in the river in summer.",
        "matchLeft": "We can",
        "matchRight": "swim in the river"
      },
      {
        "id": "p2_l3_10",
        "lesson": 3,
        "ruleTag": "دیدن با can",
        "sentence": "The students can see the answers on the board.",
        "target": "see",
        "cloze": "The students can _____ the answers on the board.",
        "promptHint": "see (شکل درست)",
        "options": [
          "see",
          "sees",
          "seeing",
          "to see"
        ],
        "fa": "دانش‌آموزان می‌توانند پاسخ‌ها را روی تخته ببینند.",
        "explainFa": "«see» پس از «can» ساده می‌ماند.",
        "chunks": [
          "The students can",
          "sees",
          "the answers on",
          "the board."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "see",
        "flawedSentence": "The students can sees the answers on the board.",
        "matchLeft": "The students can",
        "matchRight": "see the answers"
      },
      {
        "id": "p2_l3_11",
        "lesson": 3,
        "ruleTag": "بلند کردن با can",
        "sentence": "Nobody can lift this heavy box alone.",
        "target": "lift",
        "cloze": "Nobody can _____ this heavy box alone.",
        "promptHint": "lift (شکل درست)",
        "options": [
          "lift",
          "lifts",
          "lifting",
          "to lift"
        ],
        "fa": "هیچ‌کس نمی‌تواند این جعبهٔ سنگین را تنها بلند کند.",
        "explainFa": "بعد از «can» فعل ساده می‌آید.",
        "chunks": [
          "Nobody can",
          "lifts",
          "this heavy",
          "box alone."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "lift",
        "flawedSentence": "Nobody can lifts this heavy box alone.",
        "matchLeft": "Nobody can",
        "matchRight": "lift this heavy box"
      },
      {
        "id": "p2_l3_12",
        "lesson": 3,
        "ruleTag": "حفظ خواندن با can",
        "sentence": "My little sister can recite a short poem.",
        "target": "recite",
        "cloze": "My little sister can _____ a short poem.",
        "promptHint": "recite (شکل درست)",
        "options": [
          "recite",
          "recites",
          "reciting",
          "to recite"
        ],
        "fa": "خواهر کوچکم می‌تواند یک شعر کوتاه را حفظ بخواند.",
        "explainFa": "«recite» پس از «can» ساده است.",
        "chunks": [
          "My little",
          "sister can",
          "recites",
          "a short poem."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "recite",
        "flawedSentence": "My little sister can recites a short poem.",
        "matchLeft": "My little sister can",
        "matchRight": "recite a short poem"
      },
      {
        "id": "p2_l3_13",
        "lesson": 3,
        "ruleTag": "پرسش Who can",
        "sentence": "Who can win the first prize in our class?",
        "target": "win",
        "cloze": "Who can _____ the first prize in our class?",
        "promptHint": "win (شکل درست)",
        "options": [
          "win",
          "wins",
          "winning",
          "to win"
        ],
        "fa": "چه کسی می‌تواند جایزهٔ اول کلاس ما را ببرد؟",
        "explainFa": "پرسش «Who can» با فعل ساده می‌آید.",
        "chunks": [
          "Who can",
          "wins",
          "the first prize",
          "in our class?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "win",
        "flawedSentence": "Who can wins the first prize in our class?",
        "matchLeft": "Who can",
        "matchRight": "win the first prize"
      },
      {
        "id": "p2_l3_14",
        "lesson": 3,
        "ruleTag": "سؤال با Can و پاسخ کوتاه",
        "sentence": "Can he use a computer? — No, he can't.",
        "target": "Can",
        "cloze": "_____ he use a computer? — No, he can't.",
        "promptHint": "can (شکل درست)",
        "options": [
          "Can",
          "Does",
          "Is",
          "Cans"
        ],
        "fa": "آیا او می‌تواند با کامپیوتر کار کند؟ — نه، نمی‌تواند.",
        "explainFa": "پاسخ «No, he can't» نشان می‌دهد سؤال با «Can» ساخته می‌شود؛ پرسش و پاسخ کوتاه فعل کمکی یکسان دارند. «can» هیچ‌وقت «s» نمی‌گیرد.",
        "chunks": [
          "Does",
          "he use",
          "a computer?",
          "— No,",
          "he can't."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Can",
        "flawedSentence": "Does he use a computer? — No, he can't.",
        "matchLeft": "Can he use a computer?",
        "matchRight": "No, he can't."
      },
      {
        "id": "p2_l3_15",
        "lesson": 3,
        "ruleTag": "راه رفتن با can",
        "sentence": "The baby can walk a little now.",
        "target": "walk",
        "cloze": "The baby can _____ a little now.",
        "promptHint": "walk (شکل درست)",
        "options": [
          "walk",
          "walks",
          "walking",
          "to walk"
        ],
        "fa": "نوزاد الان می‌تواند کمی راه برود.",
        "explainFa": "بعد از «can» فعل ساده می‌آید.",
        "chunks": [
          "The baby",
          "can",
          "walks",
          "a little now."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "walk",
        "flawedSentence": "The baby can walks a little now.",
        "matchLeft": "The baby can",
        "matchRight": "walk a little now"
      },
      {
        "id": "p2_l3_16",
        "lesson": 3,
        "ruleTag": "مهارت با good at + اسم مصدر",
        "sentence": "Are you good at drawing pictures?",
        "target": "drawing",
        "cloze": "Are you good at _____ pictures?",
        "promptHint": "draw",
        "options": [
          "drawing",
          "draw",
          "draws",
          "to draw"
        ],
        "fa": "آیا در نقاشی مهارت داری؟",
        "explainFa": "کتاب هشتم (درس ۳، ص ۲۷): پس از «good at» فعل به شکل «-ing» می‌آید: «good at drawing».",
        "chunks": [
          "Are you",
          "good at",
          "draw",
          "pictures?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "drawing",
        "flawedSentence": "Are you good at draw pictures?",
        "matchLeft": "good at",
        "matchRight": "drawing"
      },
      {
        "id": "p2_l3_17",
        "lesson": 3,
        "ruleTag": "فعل to be مفرد در good at",
        "sentence": "My sister is good at cooking.",
        "target": "is",
        "cloze": "My sister _____ good at cooking.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "خواهرم در آشپزی مهارت دارد.",
        "explainFa": "کتاب هشتم (درس ۳، ص ۲۷): با فاعل مفرد «My sister» از «is good at» استفاده می‌کنیم.",
        "chunks": [
          "My sister",
          "are",
          "good at",
          "cooking."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "My sister are good at cooking.",
        "matchLeft": "My sister",
        "matchRight": "is good at cooking",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l3_18",
        "lesson": 3,
        "ruleTag": "فعل to be منفی با I در good at",
        "sentence": "I am not good at cooking.",
        "target": "am",
        "cloze": "I _____ not good at cooking.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "fa": "من در آشپزی مهارت ندارم.",
        "explainFa": "کتاب هشتم (درس ۳، ص ۲۷): برای «I» فعل «am» می‌آید: «I am not good at cooking».",
        "chunks": [
          "I",
          "is",
          "not good",
          "at cooking."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is not good at cooking.",
        "matchLeft": "I",
        "matchRight": "am not good at cooking"
      },
      {
        "id": "p2_l4_6",
        "lesson": 4,
        "ruleTag": "بیان سرماخوردگی با have",
        "sentence": "I have a bad cold today.",
        "target": "have",
        "cloze": "I _____ a bad cold today.",
        "promptHint": "do",
        "options": [
          "have",
          "has",
          "having",
          "am have"
        ],
        "fa": "امروز سرماخوردگی شدیدی دارم.",
        "explainFa": "با «I» فعل «have» می‌آید (نه «has»)؛ برای بیماری می‌گوییم «have a cold» و «am have» غلط است.",
        "chunks": [
          "I",
          "has",
          "a bad",
          "cold today."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have",
        "flawedSentence": "I has a bad cold today.",
        "matchLeft": "I",
        "matchRight": "have a bad cold",
        "noTyping": true
      },
      {
        "id": "p2_l4_7",
        "lesson": 4,
        "ruleTag": "بیان سردرد با has",
        "sentence": "She has a headache after the exam.",
        "target": "has",
        "cloze": "She _____ a headache after the exam.",
        "promptHint": "do",
        "options": [
          "has",
          "have",
          "having",
          "is have"
        ],
        "fa": "او بعد از امتحان سردرد دارد.",
        "explainFa": "«She» سوم‌شخص مفرد است، پس «has» می‌گیرد.",
        "chunks": [
          "She",
          "have",
          "a headache after",
          "the exam."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "She have a headache after the exam.",
        "matchLeft": "She",
        "matchRight": "has a headache",
        "noTyping": true
      },
      {
        "id": "p2_l4_8",
        "lesson": 4,
        "ruleTag": "توصیه با should و فعل ساده",
        "sentence": "You look tired; you should sleep early.",
        "target": "should",
        "cloze": "You look tired; you _____ sleep early.",
        "promptHint": "should",
        "options": [
          "should",
          "should to",
          "must to",
          "are"
        ],
        "fa": "خسته به نظر می‌رسی؛ باید زود بخوابی.",
        "explainFa": "بعد از «should» فعل بدون «to» می‌آید.",
        "chunks": [
          "You look",
          "tired; you",
          "should to",
          "sleep early."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "should",
        "flawedSentence": "You look tired; you should to sleep early.",
        "matchLeft": "You look tired",
        "matchRight": "you should sleep early",
        "noTyping": true
      },
      {
        "id": "p2_l4_9",
        "lesson": 4,
        "ruleTag": "توصیهٔ منفی با shouldn't",
        "sentence": "You shouldn't drink cold water when you have a fever.",
        "target": "shouldn't",
        "cloze": "You _____ drink cold water when you have a fever.",
        "promptHint": "should",
        "options": [
          "shouldn't",
          "should to not",
          "should not to",
          "don't should"
        ],
        "fa": "وقتی تب داری نباید آب سرد بنوشی.",
        "explainFa": "شکل منفی «shouldn't» با فعل ساده به‌کار می‌رود.",
        "chunks": [
          "You",
          "should to not",
          "drink cold water when",
          "you have a fever."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "shouldn't",
        "flawedSentence": "You should to not drink cold water when you have a fever.",
        "matchLeft": "You",
        "matchRight": "shouldn't drink cold water"
      },
      {
        "id": "p2_l4_10",
        "lesson": 4,
        "ruleTag": "پرسش از بیماری بدن",
        "sentence": "What's wrong with your stomach?",
        "target": "wrong",
        "cloze": "What's _____ with your stomach?",
        "promptHint": "wrong",
        "options": [
          "wrong",
          "problem",
          "matter",
          "the wrong"
        ],
        "fa": "معده‌ات چه اشکالی دارد؟",
        "explainFa": "در این عبارت «What's wrong with ...?» به‌کار می‌رود.",
        "chunks": [
          "What's",
          "problem",
          "with your",
          "stomach?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wrong",
        "flawedSentence": "What's problem with your stomach?",
        "matchLeft": "What's",
        "matchRight": "wrong with your stomach",
        "noTyping": true
      },
      {
        "id": "p2_l4_11",
        "lesson": 4,
        "ruleTag": "توصیهٔ تغذیه‌ای منفی",
        "sentence": "Children shouldn't eat too much sugar.",
        "target": "shouldn't",
        "cloze": "Children _____ eat too much sugar.",
        "promptHint": "should",
        "options": [
          "shouldn't",
          "should to",
          "don't should",
          "shouldn't to"
        ],
        "fa": "کودکان نباید زیادی قند بخورند.",
        "explainFa": "بعد از «shouldn't» فعل ساده بدون «to» می‌آید و «should» هرگز با «don't» منفی نمی‌شود.",
        "chunks": [
          "Children",
          "don't should",
          "eat too",
          "much sugar."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "shouldn't",
        "flawedSentence": "Children don't should eat too much sugar.",
        "matchLeft": "Children",
        "matchRight": "shouldn't eat too much sugar"
      },
      {
        "id": "p2_l4_12",
        "lesson": 4,
        "ruleTag": "تب و سرفه با has",
        "sentence": "My mother has a fever and a cough.",
        "target": "has",
        "cloze": "My mother _____ a fever and a cough.",
        "promptHint": "do",
        "options": [
          "has",
          "have",
          "having",
          "is have"
        ],
        "fa": "مادرم تب و سرفه دارد.",
        "explainFa": "فاعل «My mother» سوم‌شخص مفرد است و «has» می‌گیرد: «has a fever and a cough».",
        "chunks": [
          "My mother",
          "have",
          "a fever and",
          "a cough."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has",
        "flawedSentence": "My mother have a fever and a cough.",
        "matchLeft": "My mother",
        "matchRight": "has a fever and a cough",
        "noTyping": true
      },
      {
        "id": "p2_l4_13",
        "lesson": 4,
        "ruleTag": "توصیهٔ مراجعه به پزشک",
        "sentence": "You should see a doctor if the pain continues.",
        "target": "should",
        "cloze": "You _____ see a doctor if the pain continues.",
        "promptHint": "should",
        "options": [
          "should",
          "should to",
          "shall to",
          "can to"
        ],
        "fa": "اگر درد ادامه داشت باید به پزشک مراجعه کنی.",
        "explainFa": "«should» با فعل ساده می‌آید.",
        "chunks": [
          "You",
          "should to",
          "see a doctor if",
          "the pain continues."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "should",
        "flawedSentence": "You should to see a doctor if the pain continues.",
        "matchLeft": "You",
        "matchRight": "should see a doctor",
        "noTyping": true
      },
      {
        "id": "p2_l4_14",
        "lesson": 4,
        "ruleTag": "توصیهٔ منفی با دندان‌درد",
        "sentence": "He has a toothache; he shouldn't eat sweets.",
        "target": "shouldn't",
        "cloze": "He has a toothache; he _____ eat sweets.",
        "promptHint": "should",
        "options": [
          "shouldn't",
          "should to",
          "doesn't should",
          "not should"
        ],
        "fa": "او دندان‌درد دارد؛ نباید شیرینی بخورد.",
        "explainFa": "در توصیهٔ منفی از «shouldn't» استفاده می‌کنیم.",
        "chunks": [
          "He has a",
          "toothache; he",
          "should to",
          "eat sweets."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "shouldn't",
        "flawedSentence": "He has a toothache; he should to eat sweets.",
        "matchLeft": "He has a toothache",
        "matchRight": "he shouldn't eat sweets"
      },
      {
        "id": "p2_l4_15",
        "lesson": 4,
        "ruleTag": "توصیهٔ بهداشتی با should",
        "sentence": "The students should wash their hands before lunch.",
        "target": "should",
        "cloze": "The students _____ wash their hands before lunch.",
        "promptHint": "should",
        "options": [
          "should",
          "must to",
          "should to",
          "are"
        ],
        "fa": "دانش‌آموزان باید پیش از ناهار دست‌هایشان را بشویند.",
        "explainFa": "«should» با فعل ساده به‌کار می‌رود.",
        "chunks": [
          "The students",
          "must to",
          "wash their hands",
          "before lunch."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "should",
        "flawedSentence": "The students must to wash their hands before lunch.",
        "matchLeft": "The students",
        "matchRight": "should wash their hands",
        "noTyping": true
      },
      {
        "id": "p2_l4_16",
        "lesson": 4,
        "ruleTag": "توصیه با Why don’t you و فعل ساده",
        "sentence": "Why don't you see a doctor?",
        "target": "see",
        "cloze": "Why don't you _____ a doctor?",
        "promptHint": "see",
        "options": [
          "see",
          "seeing",
          "sees",
          "to see"
        ],
        "fa": "چرا به پزشک مراجعه نمی‌کنی؟",
        "explainFa": "کتاب هشتم (درس ۴، ص ۳۶): برای پیشنهاد با «Why don’t you» از فعل ساده استفاده می‌کنیم: «see».",
        "chunks": [
          "Why don't",
          "you",
          "seeing",
          "a doctor?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "see",
        "flawedSentence": "Why don't you seeing a doctor?",
        "matchLeft": "Why don't you",
        "matchRight": "see a doctor",
        "noTyping": true
      },
      {
        "id": "p2_l4_17",
        "lesson": 4,
        "ruleTag": "توصیه با Why don’t you برای مخاطب",
        "sentence": "You have a headache. Why don't you get some rest?",
        "target": "don't",
        "cloze": "You have a headache. Why _____ you get some rest?",
        "promptHint": "do",
        "options": [
          "don't",
          "doesn't",
          "aren't",
          "not"
        ],
        "fa": "سردرد داری. چرا کمی استراحت نمی‌کنی؟",
        "explainFa": "کتاب هشتم (درس ۴، ص ۳۶): الگوی پیشنهاد به مخاطب «Why don’t you + فعل ساده?» است؛ برای «you» از «doesn’t» استفاده نمی‌کنیم.",
        "chunks": [
          "You have a",
          "headache. Why",
          "doesn't",
          "you get some rest?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "don't",
        "flawedSentence": "You have a headache. Why doesn't you get some rest?",
        "matchLeft": "Why ___ you get some rest?",
        "matchRight": "don't"
      },
      {
        "id": "p2_l4_18",
        "lesson": 4,
        "ruleTag": "ضمیر فاعلی در توصیه با Why don’t you",
        "sentence": "Why don't you drink some water?",
        "target": "you",
        "cloze": "Why don't _____ drink some water?",
        "promptHint": "you",
        "options": [
          "you",
          "your",
          "yours",
          "yourself"
        ],
        "fa": "چرا کمی آب نمی‌نوشی؟",
        "explainFa": "کتاب هشتم (درس ۴، ص ۳۶): در این الگوی توصیه، پس از «don’t» ضمیر فاعلی «you» می‌آید، نه صفت ملکی «your».",
        "chunks": [
          "Why don't",
          "your",
          "drink some",
          "water?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "you",
        "flawedSentence": "Why don't your drink some water?",
        "matchLeft": "Why don't",
        "matchRight": "you drink some water",
        "noTyping": true
      },
      {
        "id": "p2_l5_6",
        "lesson": 5,
        "ruleTag": "وجود مفرد با a",
        "sentence": "There is a big park in our city.",
        "target": "is",
        "cloze": "There _____ a big park in our city.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "در شهر ما یک پارک بزرگ هست.",
        "explainFa": "«a big park» مفرد است، پس «There is» می‌آید.",
        "chunks": [
          "There",
          "are",
          "a big park",
          "in our city."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "There are a big park in our city.",
        "matchLeft": "There",
        "matchRight": "is a big park",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l5_7",
        "lesson": 5,
        "ruleTag": "وجود جمع با عدد",
        "sentence": "There are three museums in this small town.",
        "target": "are",
        "cloze": "There _____ three museums in this small town.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "در این شهرک کوچک سه موزه وجود دارد.",
        "explainFa": "«three museums» جمع است، پس «There are» می‌آید.",
        "chunks": [
          "There",
          "is",
          "three museums in",
          "this small town."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "There is three museums in this small town.",
        "matchLeft": "There",
        "matchRight": "are three museums",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l5_8",
        "lesson": 5,
        "ruleTag": "نفی وجود جمع",
        "sentence": "There aren't any cinemas in our village.",
        "target": "aren't",
        "cloze": "There _____ any cinemas in our village.",
        "promptHint": "there",
        "options": [
          "aren't",
          "isn't",
          "not are",
          "haven't"
        ],
        "fa": "در روستای ما هیچ سینمایی نیست.",
        "explainFa": "با «cinemas» جمع، شکل منفی «aren't» می‌آید.",
        "chunks": [
          "There",
          "isn't",
          "any cinemas in",
          "our village."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "aren't",
        "flawedSentence": "There isn't any cinemas in our village.",
        "matchLeft": "There",
        "matchRight": "aren't any cinemas",
        "noTyping": true
      },
      {
        "id": "p2_l5_9",
        "lesson": 5,
        "ruleTag": "وجود بیمارستان",
        "sentence": "There is a hospital near our school.",
        "target": "is",
        "cloze": "There _____ a hospital near our school.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "نزدیک مدرسهٔ ما یک بیمارستان هست.",
        "explainFa": "«a hospital» مفرد است، پس «There is» می‌آید.",
        "chunks": [
          "There",
          "are",
          "a hospital near",
          "our school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "There are a hospital near our school.",
        "matchLeft": "There",
        "matchRight": "is a hospital near our school",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l5_10",
        "lesson": 5,
        "ruleTag": "مقاله a در پرسش Is there",
        "sentence": "Is there a bus stop in front of your house?",
        "target": "a",
        "cloze": "Is there _____ bus stop in front of your house?",
        "promptHint": "article",
        "options": [
          "a",
          "any",
          "many",
          "much"
        ],
        "fa": "آیا جلوی خانه‌ات ایستگاه اتوبوس هست؟",
        "explainFa": "قاعدهٔ این درس: با اسم مفرد قابل‌شمارش «a» می‌آید (Is there a bus stop?) و با اسم جمع «any» (Are there any bus stops?).",
        "chunks": [
          "Is there",
          "any",
          "bus stop in front",
          "of your house?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "a",
        "flawedSentence": "Is there any bus stop in front of your house?",
        "matchLeft": "Is there",
        "matchRight": "a bus stop in front of your house"
      },
      {
        "id": "p2_l5_11",
        "lesson": 5,
        "ruleTag": "وجود درختان با many",
        "sentence": "There are many old trees in that park.",
        "target": "are",
        "cloze": "There _____ many old trees in that park.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "در آن پارک درختان کهنهٔ زیادی هست.",
        "explainFa": "«many old trees» جمع است، پس «There are» می‌آید.",
        "chunks": [
          "There",
          "is",
          "many old trees",
          "in that park."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "There is many old trees in that park.",
        "matchLeft": "There",
        "matchRight": "are many old trees",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l5_12",
        "lesson": 5,
        "ruleTag": "نفی وجود مفرد",
        "sentence": "There isn't a library in our neighborhood.",
        "target": "isn't",
        "cloze": "There _____ a library in our neighborhood.",
        "promptHint": "be",
        "options": [
          "isn't",
          "aren't",
          "not is",
          "haven't"
        ],
        "fa": "در محلهٔ ما کتابخانه‌ای نیست.",
        "explainFa": "با «library» مفرد، شکل منفی «isn't» به‌کار می‌رود.",
        "chunks": [
          "There",
          "aren't",
          "a library in",
          "our neighborhood."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "isn't",
        "flawedSentence": "There aren't a library in our neighborhood.",
        "matchLeft": "There",
        "matchRight": "isn't a library",
        "altAnswers": [
          "wasn't"
        ]
      },
      {
        "id": "p2_l5_13",
        "lesson": 5,
        "ruleTag": "any در پرسش Are there",
        "sentence": "Are there any good shops on this street?",
        "target": "any",
        "cloze": "Are there _____ good shops on this street?",
        "promptHint": "any",
        "options": [
          "any",
          "a",
          "much",
          "an"
        ],
        "fa": "آیا در این خیابان فروشگاه‌های خوبی هست؟",
        "explainFa": "در پرسش «Are there» پس از «are there» واژهٔ «any» می‌آید.",
        "chunks": [
          "Are there",
          "a",
          "good shops on",
          "this street?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "any",
        "flawedSentence": "Are there a good shops on this street?",
        "matchLeft": "Are there",
        "matchRight": "any good shops on this street",
        "noTyping": true
      },
      {
        "id": "p2_l5_14",
        "lesson": 5,
        "ruleTag": "وجود با دو و اسم جمع",
        "sentence": "There are two big bridges in this city.",
        "target": "are",
        "cloze": "There _____ two big bridges in this city.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "در این شهر دو پل بزرگ هست.",
        "explainFa": "با «two big bridges» جمع، «There are» می‌آید.",
        "chunks": [
          "There",
          "is",
          "two big bridges",
          "in this city."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "There is two big bridges in this city.",
        "matchLeft": "There",
        "matchRight": "are two big bridges",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p2_l5_15",
        "lesson": 5,
        "ruleTag": "وجود پارک کوچک",
        "sentence": "There is a small park behind our school.",
        "target": "is",
        "cloze": "There _____ a small park behind our school.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "پشت مدرسهٔ ما یک پارک کوچک هست.",
        "explainFa": "«a small park» مفرد است، پس «There is» می‌آید.",
        "chunks": [
          "There",
          "are",
          "a small park",
          "behind our school."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "There are a small park behind our school.",
        "matchLeft": "There",
        "matchRight": "is a small park behind our school",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l6_6",
        "lesson": 6,
        "ruleTag": "هوای آفتابی با is",
        "sentence": "It is very sunny in our village today.",
        "target": "is",
        "cloze": "It _____ very sunny in our village today.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "امروز در روستای ما خیلی آفتابی است.",
        "explainFa": "«It» به‌عنوان فاعل جانگانه با «is» می‌آید.",
        "chunks": [
          "It",
          "are",
          "very sunny in",
          "our village today."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "It are very sunny in our village today.",
        "matchLeft": "It",
        "matchRight": "is very sunny today"
      },
      {
        "id": "p2_l6_7",
        "lesson": 6,
        "ruleTag": "پرسش آب‌وهوا با What",
        "sentence": "What is the weather like in Tehran in summer?",
        "target": "like",
        "cloze": "What is the weather _____ in Tehran in summer?",
        "promptHint": "like",
        "options": [
          "like",
          "likes",
          "as",
          "look"
        ],
        "fa": "هوای تهران در تابستان چگونه است؟",
        "explainFa": "الگوی پرسش آب‌وهوا «What is the weather like?» است؛ اینجا «like» یعنی «چطور» و «s» نمی‌گیرد.",
        "chunks": [
          "What is",
          "the weather",
          "likes",
          "in Tehran in summer?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "like",
        "flawedSentence": "What is the weather likes in Tehran in summer?",
        "matchLeft": "What is the weather",
        "matchRight": "like in Tehran?",
        "noTyping": true
      },
      {
        "id": "p2_l6_8",
        "lesson": 6,
        "ruleTag": "صفت windy برای هوا",
        "sentence": "It is windy on the coast today.",
        "target": "windy",
        "cloze": "It is _____ on the coast today.",
        "promptHint": "wind",
        "options": [
          "windy",
          "wind",
          "winds",
          "windily"
        ],
        "fa": "امروز در ساحل هوا بادی است.",
        "explainFa": "بعد از «It is» برای توصیف هوا صفت می‌آید: «windy» (بادی)، نه اسم «wind».",
        "chunks": [
          "It is",
          "wind",
          "on the",
          "coast today."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "windy",
        "flawedSentence": "It is wind on the coast today.",
        "matchLeft": "It is",
        "matchRight": "windy on the coast"
      },
      {
        "id": "p2_l6_9",
        "lesson": 6,
        "ruleTag": "پرسش هوا با How",
        "sentence": "How is the weather in Isfahan in autumn?",
        "target": "is",
        "cloze": "How _____ the weather in Isfahan in autumn?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "does",
          "be"
        ],
        "fa": "هوای اصفهان در پاییز چگونه است؟",
        "explainFa": "اینجا «like» نداریم، پس «How is the weather?» درست است.",
        "chunks": [
          "How",
          "are",
          "the weather in",
          "Isfahan in autumn?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "How are the weather in Isfahan in autumn?",
        "matchLeft": "How",
        "matchRight": "is the weather in Isfahan",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l6_10",
        "lesson": 6,
        "ruleTag": "صفت snowy برای هوا",
        "sentence": "It is cold and snowy in the north in winter.",
        "target": "snowy",
        "cloze": "It is cold and _____ in the north in winter.",
        "promptHint": "snow",
        "options": [
          "snowy",
          "snow",
          "snows",
          "snowed"
        ],
        "fa": "در شمال در زمستان هوا سرد و برفی است.",
        "explainFa": "بعد از «It is cold and» صفت لازم است: «snowy» (برفی)، نه اسم «snow».",
        "chunks": [
          "It is cold and",
          "snow",
          "in the north",
          "in winter."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "snowy",
        "flawedSentence": "It is cold and snow in the north in winter.",
        "matchLeft": "cold and",
        "matchRight": "snowy in winter"
      },
      {
        "id": "p2_l6_11",
        "lesson": 6,
        "ruleTag": "تعطیلی مدرسه در روز بارانی",
        "sentence": "Our school is closed on rainy days.",
        "target": "is",
        "cloze": "Our school _____ closed on rainy days.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "مدرسهٔ ما در روزهای بارانی تعطیل است.",
        "explainFa": "«Our school» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "Our school",
          "are",
          "closed on",
          "rainy days."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Our school are closed on rainy days.",
        "matchLeft": "Our school",
        "matchRight": "is closed on rainy days",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l6_12",
        "lesson": 6,
        "ruleTag": "حرف اضافه in قبل از فصل",
        "sentence": "The weather is very pleasant in spring here.",
        "target": "in",
        "cloze": "The weather is very pleasant _____ spring here.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "on",
          "at",
          "to"
        ],
        "fa": "هوا در اینجا در بهار بسیار مطبوع است.",
        "explainFa": "قبل از نام فصل‌ها «in» می‌آید: «in spring».",
        "chunks": [
          "The weather is",
          "very pleasant",
          "on",
          "spring here."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "The weather is very pleasant on spring here.",
        "matchLeft": "very pleasant",
        "matchRight": "in spring"
      },
      {
        "id": "p2_l6_13",
        "lesson": 6,
        "ruleTag": "باریدن با it",
        "sentence": "It usually rains a lot in the south in summer.",
        "target": "rains",
        "cloze": "It usually _____ a lot in the south in summer.",
        "promptHint": "rain",
        "options": [
          "rains",
          "rain",
          "raining",
          "is rain"
        ],
        "fa": "در جنوب در تابستان معمولاً زیاد باران می‌بارد.",
        "explainFa": "با «it» به‌عنوان فاعل، فعل سوم‌شخص «-s» می‌گیرد.",
        "chunks": [
          "It usually",
          "rain",
          "a lot in the",
          "south in summer."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "rains",
        "flawedSentence": "It usually rain a lot in the south in summer.",
        "matchLeft": "It usually",
        "matchRight": "rains a lot in the south",
        "altAnswers": [
          "rained"
        ]
      },
      {
        "id": "p2_l6_14",
        "lesson": 6,
        "ruleTag": "هوای سرد بیرون",
        "sentence": "Take your coat; it is cold outside.",
        "target": "is",
        "cloze": "Take your coat; it _____ cold outside.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "کاپشن‌ات را بردار؛ بیرون سرد است.",
        "explainFa": "«It» با «is» می‌آید.",
        "chunks": [
          "Take your",
          "coat; it",
          "are",
          "cold outside."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "Take your coat; it are cold outside.",
        "matchLeft": "Take your coat",
        "matchRight": "it is cold outside"
      },
      {
        "id": "p2_l6_15",
        "lesson": 6,
        "ruleTag": "پرسش آب‌وهوا با What و like",
        "sentence": "What is the weather like in spring in our village?",
        "target": "is",
        "cloze": "What _____ the weather like in spring in our village?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "does",
          "be"
        ],
        "fa": "هوای روستای ما در بهار چگونه است؟",
        "explainFa": "با «like» در پایان، «What» به‌کار می‌رود.",
        "chunks": [
          "What",
          "are",
          "the weather like in",
          "spring in our village?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "What are the weather like in spring in our village?",
        "matchLeft": "What",
        "matchRight": "is the weather like in spring",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p2_l7_6",
        "lesson": 7,
        "ruleTag": "interested in با فعل ing",
        "sentence": "I am interested in learning about astronomy.",
        "target": "in",
        "cloze": "I am interested _____ learning about astronomy.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "on",
          "at",
          "to"
        ],
        "fa": "من به یادگیری نجوم علاقه‌مند هستم.",
        "explainFa": "فراتر از کتاب — بعد از «interested» حرف اضافهٔ «in» می‌آید.",
        "chunks": [
          "I am",
          "interested",
          "on",
          "learning about astronomy."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "I am interested on learning about astronomy.",
        "matchLeft": "I am interested",
        "matchRight": "in learning about astronomy"
      },
      {
        "id": "p2_l7_7",
        "lesson": 7,
        "ruleTag": "enjoy با ing",
        "sentence": "She enjoys listening traditional music in the park.",
        "target": "listening",
        "cloze": "She enjoys _____ traditional music in the park.",
        "promptHint": "listen",
        "options": [
          "listening",
          "to listen",
          "listen",
          "listens"
        ],
        "fa": "او از گوش دادن به موسیقی سنتی در پارک لذت می‌برد.",
        "explainFa": "بعد از «enjoy» فعل به شکل «-ing» می‌آید.",
        "chunks": [
          "She enjoys",
          "to listen",
          "traditional music in",
          "the park."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "listening",
        "flawedSentence": "She enjoys to listen traditional music in the park.",
        "matchLeft": "She enjoys",
        "matchRight": "listening to traditional music"
      },
      {
        "id": "p2_l7_8",
        "lesson": 7,
        "ruleTag": "good at با حرف اضافه",
        "sentence": "He is good at repairing old bikes.",
        "target": "at",
        "cloze": "He is good _____ repairing old bikes.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "for"
        ],
        "fa": "او در تعمیر موتورسیکلت‌های قدیمی مهارت دارد.",
        "explainFa": "درس ۳ کتاب (ص ۲۶–۲۷) — برای بیان مهارت، «good at» به‌کار می‌رود.",
        "chunks": [
          "He is",
          "good",
          "in",
          "repairing old bikes."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "He is good in repairing old bikes.",
        "matchLeft": "He is good",
        "matchRight": "at repairing old bikes"
      },
      {
        "id": "p2_l7_9",
        "lesson": 7,
        "ruleTag": "likes با ing",
        "sentence": "My sister likes reading poems in the morning.",
        "target": "reading",
        "cloze": "My sister likes _____ poems in the morning.",
        "promptHint": "read",
        "options": [
          "reading",
          "read",
          "reads",
          "to reading"
        ],
        "fa": "خواهرم دوست دارد صبح‌ها شعر بخواند.",
        "explainFa": "بعد از «like» فعل به شکل «-ing» (یا to + فعل ساده) می‌آید؛ «likes read» و «likes to reading» غلط‌اند.",
        "chunks": [
          "My sister likes",
          "read",
          "poems in",
          "the morning."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "reading",
        "flawedSentence": "My sister likes read poems in the morning.",
        "matchLeft": "My sister likes",
        "matchRight": "reading poems in the morning"
      },
      {
        "id": "p2_l7_10",
        "lesson": 7,
        "ruleTag": "hate با ing",
        "sentence": "They hate waiting in long queues.",
        "target": "waiting",
        "cloze": "They hate _____ in long queues.",
        "promptHint": "wait",
        "options": [
          "waiting",
          "wait",
          "waits",
          "to waiting"
        ],
        "fa": "آن‌ها از منتظر ماندن در صف‌های طولانی بیزارند.",
        "explainFa": "بعد از «hate» فعل به شکل «-ing» (یا to + فعل ساده) می‌آید؛ «hate wait» و «hate to waiting» غلط‌اند.",
        "chunks": [
          "They hate",
          "wait",
          "in long",
          "queues."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "waiting",
        "flawedSentence": "They hate wait in long queues.",
        "matchLeft": "They hate",
        "matchRight": "waiting in long queues"
      },
      {
        "id": "p2_l7_11",
        "lesson": 7,
        "ruleTag": "علاقه به آهنگ با in",
        "sentence": "We are interested in learning English songs.",
        "target": "in",
        "cloze": "We are interested _____ learning English songs.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "at",
          "on",
          "of"
        ],
        "fa": "ما به یادگیری آهنگ‌های انگلیسی علاقه‌مند هستیم.",
        "explainFa": "فراتر از کتاب — حرف اضافهٔ «in» بعد از «interested» می‌آید.",
        "chunks": [
          "We are",
          "interested",
          "at",
          "learning English songs."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "in",
        "flawedSentence": "We are interested at learning English songs.",
        "matchLeft": "We are interested",
        "matchRight": "in learning English songs"
      },
      {
        "id": "p2_l7_12",
        "lesson": 7,
        "ruleTag": "مهارت نقاشی با good at",
        "sentence": "Sina is good at drawing simple pictures.",
        "target": "at",
        "cloze": "Sina is good _____ drawing simple pictures.",
        "promptHint": "in / on / at",
        "options": [
          "at",
          "in",
          "on",
          "with"
        ],
        "fa": "سینا در کشیدن نقاشی‌های ساده مهارت دارد.",
        "explainFa": "درس ۳ کتاب (ص ۲۶–۲۷) — «good at» با فعل «-ing» می‌آید.",
        "chunks": [
          "Sina is",
          "good",
          "in",
          "drawing simple pictures."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "at",
        "flawedSentence": "Sina is good in drawing simple pictures.",
        "matchLeft": "Sina is good",
        "matchRight": "at drawing simple pictures"
      },
      {
        "id": "p2_l7_13",
        "lesson": 7,
        "ruleTag": "enjoys با telling",
        "sentence": "Our teacher enjoys telling new stories to us.",
        "target": "telling",
        "cloze": "Our teacher enjoys _____ new stories to us.",
        "promptHint": "tell",
        "options": [
          "telling",
          "to tell",
          "tell",
          "tells"
        ],
        "fa": "معلم ما از تعریف داستان‌های جدید لذت می‌برد.",
        "explainFa": "بعد از «enjoys» فعل «-ing» می‌آید.",
        "chunks": [
          "Our teacher enjoys",
          "to tell",
          "new stories",
          "to us."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "telling",
        "flawedSentence": "Our teacher enjoys to tell new stories to us.",
        "matchLeft": "Our teacher enjoys",
        "matchRight": "telling new stories to us"
      },
      {
        "id": "p2_l7_14",
        "lesson": 7,
        "ruleTag": "علاقه به عکاسی",
        "sentence": "I am interested in photography as a hobby.",
        "target": "in",
        "cloze": "I am interested _____ photography as a hobby.",
        "promptHint": "in / on / at",
        "options": [
          "in",
          "for",
          "at",
          "on"
        ],
        "fa": "من به عکاسی به‌عنوان سرگرمی علاقه‌مند هستم.",
        "explainFa": "فراتر از کتاب — «interested in» ترکیب ثابت است.",
        "chunks": [
          "I am interested",
          "for",
          "photography as",
          "a hobby."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "in",
        "flawedSentence": "I am interested for photography as a hobby.",
        "matchLeft": "I am interested",
        "matchRight": "in photography as a hobby"
      },
      {
        "id": "p2_l7_15",
        "lesson": 7,
        "ruleTag": "پرسش با enjoy و ing",
        "sentence": "What do you enjoy doing in your free time?",
        "target": "doing",
        "cloze": "What do you enjoy _____ in your free time?",
        "promptHint": "do",
        "options": [
          "doing",
          "to do",
          "do",
          "does"
        ],
        "fa": "در اوقات فراغت از چه کاری لذت می‌بری؟",
        "explainFa": "بعد از «enjoy» فعل به شکل «-ing» می‌آید.",
        "chunks": [
          "What do",
          "you enjoy",
          "to do",
          "in your free time?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "doing",
        "flawedSentence": "What do you enjoy to do in your free time?",
        "matchLeft": "What do you enjoy",
        "matchRight": "doing in your free time"
      },
      {
        "id": "p2_l7_16",
        "lesson": 7,
        "ruleTag": "حرف اضافهٔ as در as a hobby",
        "sentence": "What do you do as a hobby? — I watch movies.",
        "target": "as",
        "cloze": "What do you do _____ a hobby? — I watch movies.",
        "promptHint": "as",
        "options": [
          "as",
          "like",
          "with",
          "by"
        ],
        "fa": "به‌عنوان سرگرمی چه کار می‌کنی؟ — فیلم می‌بینم.",
        "explainFa": "کتاب (ص ۵۵: «What do you do as a hobby?»): «as» یعنی «به‌عنوان».",
        "chunks": [
          "What do you do",
          "like",
          "a hobby? —",
          "I watch movies."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "as",
        "flawedSentence": "What do you do like a hobby? — I watch movies.",
        "matchLeft": "What do you do ___ a hobby?",
        "matchRight": "as",
        "noTyping": true
      },
      {
        "id": "p2_l7_17",
        "lesson": 7,
        "ruleTag": "حرف اضافهٔ in در free time",
        "sentence": "What do you do in your free time? — I play tennis.",
        "target": "in",
        "cloze": "What do you do _____ your free time? — I play tennis.",
        "promptHint": "in",
        "options": [
          "in",
          "at",
          "by",
          "with"
        ],
        "fa": "در اوقات فراغتت چه کار می‌کنی؟ — تنیس بازی می‌کنم.",
        "explainFa": "کتاب (ص ۵۵: «What do you do in your free time?»): با «free time» حرف اضافهٔ «in» می‌آید.",
        "chunks": [
          "What do you do",
          "at",
          "your free time? —",
          "I play tennis."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "in",
        "flawedSentence": "What do you do at your free time? — I play tennis.",
        "matchLeft": "___ your free time",
        "matchRight": "in",
        "noTyping": true
      }
    ],
    "onboarding": {
      "id": "p2_onboard",
      "sentence": "Ali and Reza are from Iran.",
      "cloze": "Ali and Reza _____ from Iran.",
      "target": "are",
      "options": [
        "are",
        "is",
        "am",
        "be"
      ],
      "fa": "علی و رضا اهل ایران هستند.",
      "explainFa": "دو نفر («Ali and Reza») جمع‌اند، پس «are» می‌گیرند."
    }
  },
  "prospect_3": {
    "id": "prospect_3",
    "name": "Prospect 3",
    "titleFa": "پایه نهم",
    "modeBadgeFa": "قواعد گرامری پایه (Core Grammar)",
    "lessonsCount": 6,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: Personality",
        "titleFa": "درس ۱: ویژگی‌های شخصیتی، فعل to be و شکل کوتاه آن",
        "categoryFa": "گرامر پایه",
        "summaryFa": "برای پرسیدن دربارهٔ ویژگی یا شخصیت کسی می‌توان گفت «What is he/she like?». این پرسش بسته به بافت می‌تواند توصیف ظاهر را هم در بر گیرد؛ پرسش صریح‌تر از ظاهر «What does he/she look like?» است. فعل «to be» شکل کوتاه هم دارد، مانند «I’m / he’s / they’re»، اما در پاسخ کوتاه مثبت فعل پایانی را کامل می‌آوریم: «Yes, they are».",
        "formulas": [
          {
            "label": "پرسش شخصیت (?)",
            "chips": [
              {
                "role": "sig",
                "text": "What"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "subj",
                "text": "he"
              },
              {
                "role": "verb",
                "text": "like?"
              }
            ],
            "exampleEn": "He is patient, kind, and neat.",
            "exampleFa": "او صبور، مهربان و منظم است.",
            "learnerGlossFa": "او چه جور آدمی است؟"
          },
          {
            "label": "شکل کوتاه to be",
            "chips": [
              {
                "role": "subj",
                "text": "I'm / He's / They're"
              },
              {
                "role": "obj",
                "text": "very kind."
              }
            ],
            "exampleEn": "She's my classmate. She's very talkative.",
            "exampleFa": "او هم‌کلاسی من است. او خیلی پرحرف است.",
            "learnerGlossFa": "من بسیار مهربانم / او بسیار مهربان است / آن‌ها بسیار مهربان‌اند."
          }
        ],
        "signals": [
          "What is ... like?",
          "kind / neat / brave / talkative",
          "I'm / he's / they're",
          "Yes, they are (بدون شکل کوتاه)"
        ],
        "traps": [
          {
            "wrong": "What is she like? — She are kind and helpful.",
            "right": "What is she like? — She is kind and helpful.",
            "noteFa": "با فاعل «she» از «is» استفاده می‌کنیم. پاسخ «She is tall» نیز بسته به بافت می‌تواند توصیف ظاهر باشد؛ برای پرسش مشخص از ظاهر، «What does she look like?» روشن‌تر است."
          },
          {
            "wrong": "Are your friends helpful? — Yes, they're.",
            "right": "Are your friends helpful? — Yes, they are.",
            "noteFa": "در پاسخ کوتاه مثبت (Yes)، هرگز فعل to be را مخفف نمی‌کنیم (Yes, I am / Yes, he is / Yes, they are)."
          }
        ],
        "timelineType": "clause_link",
        "timelineCaptionFa": "تمایز شخصیت درونی (What is he like?) از ظاهر بیرونی (What does he look like?)",
        "contextDialogue": {
          "lineA": "What is your new classmate like?",
          "faA": "هم‌کلاسی جدیدت از نظر اخلاقی چطور آدمی است؟",
          "lineB": "He is very patient, polite, and helpful. Everyone likes his personality.",
          "faB": "او بسیار صبور، مؤدب و یاری‌رسان است. همه شخصیت او را دوست دارند."
        },
        "guidedDiscovery": {
          "questionFa": "چرا در این گفت‌وگو در پاسخ به «What is he like?» ویژگی‌های «patient and polite» را گفتیم؟",
          "options": [
            "چون این پرسش می‌تواند دربارهٔ شخصیت باشد؛ «look like» مشخصاً ظاهر را می‌پرسد.",
            "چون tall صفت نیست",
            "چون جمله منفی است"
          ],
          "correctIdx": 0,
          "insightFa": "«What is he like?» می‌تواند دربارهٔ ویژگی‌های فرد باشد و بسته به بافت شامل ظاهر هم بشود. «What does he look like?» مشخصاً دربارهٔ ظاهر است."
        },
        "threeD": {
          "formFa": "What + am/is/are + Subj + like? | I'm / he's / she's / they're (شکل کوتاه to be)",
          "meaningFa": "توصیف منش و صفات شخصیتی انسان‌ها",
          "useFa": "توصیف شخصیت افراد در مکالمه؛ در پاسخ کوتاه مثبت شکل کامل می‌آید (Yes, they are)"
        },
        "learnerGuide": {
          "explainFa": "پرسش What is he like می‌تواند دربارهٔ ویژگی یا شخصیت فرد باشد و بسته به بافت ظاهر را هم در بر بگیرد. پرسش What does he look like مشخصاً دربارهٔ ظاهر است. فعل بودن را می‌توان در جمله کوتاه کرد، مانند he is به he’s؛ در پاسخ کوتاه مثبت، فعل پایانی را کامل می‌آوریم.",
          "examples": [
            {
              "en": "What is he like?",
              "fa": "او چه جور آدمی است؟"
            },
            {
              "en": "Yes, he is.",
              "fa": "بله، او هست."
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: Travel",
        "titleFa": "درس ۲: زمان حال استمراری (Present Continuous)",
        "categoryFa": "گرامر پایه",
        "summaryFa": "کارهایی که دقیقاً در لحظه صحبت در جریان هستند با «am / is / are + فعل + ing» ساخته می‌شوند. هنگام افزودن ing، حرف e بی‌صدای پایانی حذف و در افعال تک‌هجایی CVC حرف آخر تکرار می‌شود.",
        "formulas": [
          {
            "label": "مثبت (+)",
            "chips": [
              {
                "role": "subj",
                "text": "They"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "verb",
                "text": "packing"
              },
              {
                "role": "obj",
                "text": "their suitcases"
              },
              {
                "role": "sig",
                "text": "now."
              }
            ],
            "exampleEn": "I am checking the timetable right now.",
            "exampleFa": "همین حالا دارم جدول زمان‌بندی را بررسی می‌کنم.",
            "learnerGlossFa": "آن‌ها الآن در حال بستن چمدان‌هایشان هستند."
          },
          {
            "label": "سؤالی (?)",
            "chips": [
              {
                "role": "aux",
                "text": "Is"
              },
              {
                "role": "subj",
                "text": "the receptionist"
              },
              {
                "role": "verb",
                "text": "talking"
              },
              {
                "role": "obj",
                "text": "on the phone?"
              }
            ],
            "exampleEn": "Where are you staying?",
            "exampleFa": "کجا اقامت دارید؟",
            "learnerGlossFa": "آیا مسئول پذیرش در حال صحبت با تلفن است؟"
          },
          {
            "label": "See also (کتاب ص ۳۶): مالکیت با ’s و of",
            "chips": [
              {
                "role": "subj",
                "text": "Kate's scarf"
              },
              {
                "role": "sig",
                "text": "teachers' office"
              },
              {
                "role": "obj",
                "text": "the legs of the chair"
              }
            ],
            "exampleEn": "This is Jack's shirt. The door of the room is open.",
            "exampleFa": "این پیراهنِ جک است. درِ اتاق باز است.",
            "learnerGlossFa": "روسری کیت؛ دفتر معلمان؛ پایه‌های صندلی."
          }
        ],
        "signals": [
          "now",
          "right now",
          "at the moment",
          "Look!",
          "Listen!",
          "Kate's / teachers' / the legs of the chair"
        ],
        "traps": [
          {
            "wrong": "She is makeing a cake.",
            "right": "She is making a cake.",
            "noteFa": "حرف «e» بی‌صدا در انتهای فعل (make, write, drive) قبل از افزودن «-ing» حذف می‌شود."
          },
          {
            "wrong": "They are swiming.",
            "right": "They are swimming.",
            "noteFa": "در بعضی فعل‌های کوتاه مانند «swim»، «sit»، «run» و «plan»، حرف پایانی پیش از «-ing» تکرار می‌شود؛ این قاعده به الگوی آوایی و املایی واژه وابسته است."
          }
        ],
        "timelineType": "present_now",
        "timelineCaptionFa": "رویداد در حال وقوع دقیقاً در لحظه سخن گفتن (Now / At the moment)",
        "contextDialogue": {
          "lineA": "Look! Why is the tourist running toward the gate right now?",
          "faA": "نگاه کن! چرا آن گردشگر همین الان دارد به سمت گیت می‌دود؟",
          "lineB": "Because the flight is boarding at the moment!",
          "faB": "چون پرواز در همین لحظه در حال سوار کردن مسافران است!"
        },
        "guidedDiscovery": {
          "questionFa": "هنگام افزودن «-ing» به فعل «run»، چرا حرف «n» دوبار نوشته شده است (running)؟",
          "options": [
            "چون فعل تک‌هجایی با الگوی همخوان + مصوت کوتاه + همخوان (CVC) است",
            "چون فاعل مفرد است",
            "در همه افعال حرف آخر تکرار می‌شود"
          ],
          "correctIdx": 0,
          "insightFa": "قانون طلایی املا در پایه نهم: sit→sitting، swim→swimming، make→making (حذف e)، lie→lying."
        },
        "threeD": {
          "formFa": "am / is / are + Verb-ing (با رعایت قواعد املایی حذف e و تکرار CVC)",
          "meaningFa": "عملی پویا و موقتی که هم‌زمان با لحظه صحبت در جریان است",
          "useFa": "همراه نشانه‌های Look!, Listen!, now, right now, at the moment در سفر و موقعیت‌های زنده"
        },
        "learnerGuide": {
          "explainFa": "حال استمراری را با am، is یا are و شکل ing فعل می‌سازیم؛ برای کاری که اکنون یا در دوره‌ای موقت در جریان است کاربرد دارد. برای پرسش، فعل بودن پیش از فاعل می‌آید. در نوشتن ing، گاهی e پایانی حذف یا حرف آخر تکرار می‌شود.",
          "examples": [
            {
              "en": "They are packing now.",
              "fa": "آن‌ها الآن در حال بستن وسایل هستند."
            },
            {
              "en": "Is she talking?",
              "fa": "آیا او در حال صحبت‌کردن است؟"
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: Festivals and Ceremonies",
        "titleFa": "درس ۳: زمان حال ساده (Simple Present) و صفات ملکی",
        "categoryFa": "گرامر پایه",
        "summaryFa": "عادت‌ها و رسم‌های همیشگی با حال ساده بیان می‌شوند: برای «he / she / it» در جمله مثبت به فعل «-s / -es / -ies» اضافه می‌کنیم و در منفی/سؤالی با «doesn't / Does» فعل به شکل ساده برمی‌گردد! صفات ملکی (my, your, his, her, its, our, their) همیشه قبل از اسم می‌آیند.",
        "formulas": [
          {
            "label": "مثبت سوم‌شخص (+)",
            "chips": [
              {
                "role": "subj",
                "text": "She"
              },
              {
                "role": "sig",
                "text": "always"
              },
              {
                "role": "verb",
                "text": "helps"
              },
              {
                "role": "obj",
                "text": "her mother."
              }
            ],
            "exampleEn": "Iranians celebrate Yalda Night every year.",
            "exampleFa": "ایرانی‌ها هر سال شب یلدا را جشن می‌گیرند.",
            "learnerGlossFa": "او همیشه به مادرش کمک می‌کند."
          },
          {
            "label": "منفی و سؤالی (−/?)",
            "chips": [
              {
                "role": "subj",
                "text": "He"
              },
              {
                "role": "aux",
                "text": "doesn't"
              },
              {
                "role": "verb",
                "text": "stay"
              },
              {
                "role": "obj",
                "text": "up late."
              }
            ],
            "exampleEn": "Does your family set the Haft-Seen table?",
            "exampleFa": "آیا خانواده‌ات سفره هفت‌سین می‌چینند؟",
            "learnerGlossFa": "او تا دیروقت بیدار نمی‌ماند."
          },
          {
            "label": "صفت ملکی (+)",
            "chips": [
              {
                "role": "sig",
                "text": "Their"
              },
              {
                "role": "subj",
                "text": "children"
              },
              {
                "role": "aux",
                "text": "are"
              },
              {
                "role": "obj",
                "text": "polite."
              }
            ],
            "exampleEn": "Is Sara's room clean? — Yes, her room is very neat.",
            "exampleFa": "آیا اتاق سارا تمیز است؟ — بله، اتاقش بسیار مرتب است.",
            "learnerGlossFa": "فرزندان آن‌ها مؤدب هستند."
          }
        ],
        "signals": [
          "every year",
          "he / she / it + V-s",
          "doesn't / Does + فعل ساده",
          "my / your / his / her / its / our / their + Noun"
        ],
        "traps": [
          {
            "wrong": "Does she bakes sweets?",
            "right": "Does she bake sweets?",
            "noteFa": "با آمدن «Does / doesn't»، حرف «s» سوم‌شخص از فعل اصلی حذف می‌شود!"
          },
          {
            "wrong": "The tree loses it's leaves in autumn.",
            "right": "The tree loses its leaves in autumn.",
            "noteFa": "صفت ملکی «its» آپاستروف ندارد؛ «it’s» بسته به جمله می‌تواند کوتاه‌شدهٔ «it is» یا «it has» باشد."
          }
        ],
        "timelineType": "habit_dots",
        "timelineCaptionFa": "تکرار منظم عادت‌ها و آیین‌ها در گذشته، حال و آینده (Simple Present)",
        "contextDialogue": {
          "lineA": "How often does your family celebrate Yalda Night together?",
          "faA": "خانواده شما هر چند وقت یک‌بار شب یلدا را دور هم جشن می‌گیرند؟",
          "lineB": "We always gather at my grandfather's house, and he never forgets Hafez poems.",
          "faB": "ما همیشه در خانه پدربزرگم جمع می‌شویم و او هرگز اشعار حافظ را فراموش نمی‌کند."
        },
        "guidedDiscovery": {
          "questionFa": "وقتی برای او (he) جمله را با «doesn't» منفی می‌کنیم، چه بلایی سر «-s» انتهای فعل اصلی می‌آید؟",
          "options": [
            "حرف s کاملاً حذف می‌شود و فعل به شکل ساده برمی‌گردد (doesn't forget)",
            "حرف s باقی می‌ماند",
            "فعل ed می‌گیرد"
          ],
          "correctIdx": 0,
          "insightFa": "آفرین! «Does / doesn't» خودش نشانه سوم‌شخص را بلعیده است؛ پس فعل اصلی ساده می‌شود."
        },
        "threeD": {
          "formFa": "I/You/We/They + V | He/She/It + V-s/es | don't/doesn't + V ساده | صفت ملکی + اسم",
          "meaningFa": "بیان حقایق کلی، سنت‌های فرهنگی و عادت‌های همیشگی",
          "useFa": "بیان عادت‌ها و رسم‌ها؛ صفت ملکی همیشه قبل از اسم می‌آید (her mother, their house)"
        },
        "learnerGuide": {
          "explainFa": "حال ساده برای عادت و کارهای تکراری به کار می‌رود. در جملهٔ مثبت با he، she یا it معمولاً به فعل s یا es اضافه می‌شود؛ پس از does و doesn’t، فعل اصلی دوباره ساده است. صفت ملکی مثل my یا their پیش از اسم قرار می‌گیرد.",
          "examples": [
            {
              "en": "She helps her mother.",
              "fa": "او به مادرش کمک می‌کند."
            },
            {
              "en": "He doesn't stay up late.",
              "fa": "او تا دیروقت بیدار نمی‌ماند."
            }
          ]
        }
      },
      {
        "id": 4,
        "titleEn": "Lesson 4: Services",
        "titleFa": "درس ۴: پرسش‌های Wh در حال ساده و قیدهای تکرار (+ جملات امری)",
        "categoryFa": "گرامر پایه",
        "summaryFa": "ساختار پرسش اطلاعاتی در حال ساده «Wh + do/does + فاعل + فعل ساده» است. قیدهای تکرار (always … never) قبل از فعل اصلی و بعد از am/is/are می‌آیند؛ کتاب (ص ۷۰): «We are sometimes busy» جملات امری هم با شکل ساده فعل شروع و با «Don't» منفی می‌شوند.",
        "formulas": [
          {
            "label": "پرسش Wh (?)",
            "chips": [
              {
                "role": "sig",
                "text": "How"
              },
              {
                "role": "aux",
                "text": "does"
              },
              {
                "role": "subj",
                "text": "he"
              },
              {
                "role": "verb",
                "text": "go"
              },
              {
                "role": "obj",
                "text": "to work?"
              }
            ],
            "exampleEn": "When does the bank open?",
            "exampleFa": "بانک چه زمانی باز می‌شود؟",
            "learnerGlossFa": "او چگونه به سر کار می‌رود؟"
          },
          {
            "label": "قید تکرار (کتاب ص ۷۰)",
            "chips": [
              {
                "role": "subj",
                "text": "He"
              },
              {
                "role": "sig",
                "text": "always"
              },
              {
                "role": "verb",
                "text": "comes"
              },
              {
                "role": "obj",
                "text": "on time."
              }
            ],
            "exampleEn": "We are sometimes busy.",
            "exampleFa": "ما گاهی سرمان شلوغ است.",
            "learnerGlossFa": "او همیشه به‌موقع می‌آید."
          },
          {
            "label": "جمله امری (+/−)",
            "chips": [
              {
                "role": "aux",
                "text": "Please / Don't"
              },
              {
                "role": "verb",
                "text": "press"
              },
              {
                "role": "obj",
                "text": "the red button."
              }
            ],
            "exampleEn": "Fill out this form carefully.",
            "exampleFa": "این فرم را با دقت پر کنید.",
            "learnerGlossFa": "لطفاً دکمهٔ قرمز را فشار بده / فشار نده."
          }
        ],
        "signals": [
          "Where / When / How + do/does",
          "always (100%) … never (0%)",
          "usually / often / sometimes",
          "Please / Don't + Base Verb"
        ],
        "traps": [
          {
            "wrong": "Doesn't park your car here!",
            "right": "Don't park your car here!",
            "noteFa": "جملهٔ امری منفی خطاب به «you» مستتر است و همیشه با «Don't + شکل ساده فعل» شروع می‌شود، هرگز با «Doesn't»!"
          },
          {
            "wrong": "He comes always on time.",
            "right": "He always comes on time. / He is always on time.",
            "noteFa": "قید تکرار معمولاً پیش از فعل اصلی («always comes») و پس از فعل بودن («is always») قرار می‌گیرد."
          }
        ],
        "timelineType": "pattern_flow",
        "timelineCaptionFa": "ساختار پرسش‌های اطلاعاتی Wh- و دستورالعمل‌های امری مثبت و منفی",
        "contextDialogue": {
          "lineA": "Excuse me, how does this ATM work?",
          "faA": "ببخشید، این خودپرداز چطور کار می‌کند؟",
          "lineB": "Insert your card first, and don't share your password with anyone!",
          "faB": "ابتدا کارتتان را وارد کنید و رمزتان را به هیچ‌کس نگویید!"
        },
        "guidedDiscovery": {
          "questionFa": "چرا در جمله «Insert your card» هیچ فاعلی (مثل You) در ابتدای جمله نیامده است؟",
          "options": [
            "چون جمله امری (Imperative) است و مستقیم با شکل ساده فعل شروع می‌شود",
            "چون جمله ناقص است",
            "چون مربوط به گذشته است"
          ],
          "correctIdx": 0,
          "insightFa": "عالی! جملات امری مستقیم با فعل ساده آغاز و با «Don't + فعل ساده» منفی می‌شوند (هرگز Doesn't نگذارید!)."
        },
        "threeD": {
          "formFa": "Wh + do/does + Subj + Base Verb? (به‌جز Who فاعلی!) | قید تکرار: قبل از فعل اصلی، بعد از to be | Base Verb ... / Don't + Base Verb ...",
          "meaningFa": "دریافت اطلاعات خدماتی و صدور راهنمایی یا هشدار مستقیم",
          "useFa": "دفترچه راهنما، تابلوهای ایمنی، بانک، اداره پست و اورژانس"
        },
        "learnerGuide": {
          "explainFa": "برای پرسش دربارهٔ زمان، مکان یا شیوه در حال ساده، واژهٔ پرسشی و سپس do یا does را پیش از فاعل بیاور. قید تکرار معمولاً پیش از فعل اصلی و پس از فعل بودن قرار می‌گیرد. در دستور منفی از Don’t و فعل ساده استفاده کن.",
          "examples": [
            {
              "en": "When does the bank open?",
              "fa": "بانک چه زمانی باز می‌شود؟"
            },
            {
              "en": "We are sometimes busy.",
              "fa": "ما گاهی سرمان شلوغ است."
            }
          ]
        }
      },
      {
        "id": 5,
        "titleEn": "Lesson 5: Media",
        "titleFa": "درس ۵: گذشته ساده — افعال باقاعده (Simple Past: Regular)",
        "categoryFa": "گرامر پایه",
        "summaryFa": "برای بیان کارهای پایان‌یافته در گذشته به افعال باقاعده «-d / -ed / -ied» اضافه می‌کنیم و برای منفی یا سؤالی کردن همه اشخاص از «didn't / Did + شکل ساده فعل» استفاده می‌کنیم. گذشته to be نیز «was / were» است.",
        "formulas": [
          {
            "label": "مثبت گذشته (+)",
            "chips": [
              {
                "role": "subj",
                "text": "We"
              },
              {
                "role": "verb",
                "text": "watched"
              },
              {
                "role": "obj",
                "text": "a documentary"
              },
              {
                "role": "sig",
                "text": "last night."
              }
            ],
            "exampleEn": "She studied hard for the exam yesterday.",
            "exampleFa": "او دیروز برای امتحان سخت درس خواند.",
            "learnerGlossFa": "ما دیشب مستندی تماشا کردیم."
          },
          {
            "label": "منفی و سؤالی (−/?)",
            "chips": [
              {
                "role": "aux",
                "text": "Did"
              },
              {
                "role": "subj",
                "text": "you"
              },
              {
                "role": "verb",
                "text": "install"
              },
              {
                "role": "obj",
                "text": "the app?"
              }
            ],
            "exampleEn": "He didn't attend the online class.",
            "exampleFa": "او در کلاس آنلاین شرکت نکرد.",
            "learnerGlossFa": "آیا تو برنامه را نصب کردی؟"
          },
          {
            "label": "See also (کتاب ص ۸۸): گذشتهٔ to be",
            "chips": [
              {
                "role": "subj",
                "text": "I / he / she / it"
              },
              {
                "role": "aux",
                "text": "was"
              },
              {
                "role": "subj",
                "text": "you / we / they"
              },
              {
                "role": "aux",
                "text": "were"
              }
            ],
            "exampleEn": "I was happy yesterday. There were many messages in my mailbox.",
            "exampleFa": "دیروز خوشحال بودم. پیام‌های زیادی در صندوق پیامم بود.",
            "learnerGlossFa": "برای I، he، she و it از was و برای you، we و they از were استفاده می‌شود."
          }
        ],
        "signals": [
          "yesterday",
          "last night / week / year",
          "two days ago",
          "in 2020",
          "was / were · There was / There were"
        ],
        "traps": [
          {
            "wrong": "She didn't watched the news.",
            "right": "She didn't watch the news.",
            "noteFa": "بعد از «Did» و «didn't» فعل حتماً به شکل ساده بدون «-ed» برمی‌گردد!"
          },
          {
            "wrong": "The internet wasn't work last night.",
            "right": "The internet didn't work last night.",
            "noteFa": "«work» در این جمله فعل اصلی است و گذشتهٔ منفی آن با «didn’t + شکل ساده» ساخته می‌شود. «wasn’t / weren’t» می‌توانند با اسم یا صفت بیایند."
          }
        ],
        "timelineType": "past_point",
        "timelineCaptionFa": "عملی که در نقطه‌ای مشخص از گذشته آغاز و کاملاً تمام شده است (Regular Past)",
        "contextDialogue": {
          "lineA": "Did you watch the documentary on Iranian scientists last night?",
          "faA": "آیا دیشب مستند دانشمندان ایرانی را تماشا کردی؟",
          "lineB": "No, I didn't watch TV; I studied for my English test.",
          "faB": "نه، تلویزیون تماشا نکردم؛ برای امتحان زبانم درس خواندم."
        },
        "guidedDiscovery": {
          "questionFa": "چرا در «studied» پسوند گذشته گرفتیم اما در «didn't watch» پسوند -ed نیامد؟",
          "options": [
            "چون حضور Did / didn't زمان گذشته را نشان می‌دهد و فعل اصلی را به شکل ساده برمی‌گرداند",
            "چون watch فعل بی‌قاعده است",
            "چون TV مفرد است"
          ],
          "correctIdx": 0,
          "insightFa": "دقیقاً! در سؤالی و منفی گذشته ساده با «Did / didn't»، فعل اصلی همیشه بدون «-ed» است."
        },
        "threeD": {
          "formFa": "Subj + Verb-ed/d/ied | didn't + Base Verb | Did + Subj + Base Verb? | was / were",
          "meaningFa": "گزارش رویدادهای خاتمه‌یافته در زمان مشخص گذشته",
          "useFa": "همراه با قیدهای صریح گذشته: yesterday، last night/week، two days ago، in 2020"
        },
        "learnerGuide": {
          "explainFa": "در گذشتهٔ ساده، فعل باقاعده در جملهٔ مثبت معمولاً با افزودن ed ساخته می‌شود؛ املای بعضی فعل‌ها تغییر می‌کند. در پرسش و منفی از did یا didn’t و فعل ساده استفاده کن. گذشتهٔ فعل بودن، was یا were است و با did ساخته نمی‌شود.",
          "examples": [
            {
              "en": "She studied yesterday.",
              "fa": "او دیروز درس خواند."
            },
            {
              "en": "He didn't attend the class.",
              "fa": "او در کلاس شرکت نکرد."
            }
          ]
        }
      },
      {
        "id": 6,
        "titleEn": "Lesson 6: Health and Injuries",
        "titleFa": "درس ۶: گذشته ساده — افعال بی‌قاعده (Simple Past: Irregular)",
        "categoryFa": "گرامر پایه",
        "summaryFa": "افعال بی‌قاعده در گذشته مثبت، شکل خاصی دارند (مثل break → broke، go → went، hurt → hurt، cut → cut)، اما در حالت منفی و سؤالی دقیقاً مثل افعال باقاعده با «didn’t / Did + شکل ساده» ساخته می‌شوند.",
        "formulas": [
          {
            "label": "مثبت بی‌قاعده (+)",
            "chips": [
              {
                "role": "subj",
                "text": "Sina"
              },
              {
                "role": "verb",
                "text": "broke"
              },
              {
                "role": "obj",
                "text": "his leg"
              },
              {
                "role": "sig",
                "text": "yesterday."
              }
            ],
            "exampleEn": "He fell off his bike and hurt his knee.",
            "exampleFa": "او از دوچرخه‌اش افتاد و زانویش آسیب دید.",
            "learnerGlossFa": "سینا دیروز پایش را شکست."
          },
          {
            "label": "منفی و سؤالی (−/?)",
            "chips": [
              {
                "role": "subj",
                "text": "She"
              },
              {
                "role": "aux",
                "text": "didn't"
              },
              {
                "role": "verb",
                "text": "take"
              },
              {
                "role": "obj",
                "text": "any medicine."
              }
            ],
            "exampleEn": "How did it happen? — He cut his finger.",
            "exampleFa": "چطور اتفاق افتاد؟ — انگشتش را برید.",
            "learnerGlossFa": "او هیچ دارویی مصرف نکرد."
          },
          {
            "label": "See also (کتاب ص ۱۰۲): ضمایر مفعولی",
            "chips": [
              {
                "role": "subj",
                "text": "They"
              },
              {
                "role": "verb",
                "text": "invited"
              },
              {
                "role": "obj",
                "text": "me / him / her / us / them"
              }
            ],
            "exampleEn": "They saw Ali in the park. They saw him in the park.",
            "exampleFa": "آن‌ها علی را در پارک دیدند. آن‌ها او را در پارک دیدند.",
            "learnerGlossFa": "آن‌ها من، او، ما یا آن‌ها را دعوت کردند."
          }
        ],
        "signals": [
          "broke / fell / went / saw / took",
          "hurt / cut / hit / put (بدون تغییر!)",
          "yesterday / last week",
          "an hour ago",
          "hurt / cut / put (بی‌قاعده ثابت)",
          "went / saw / broke / fell",
          "me / him / her / us / them"
        ],
        "traps": [
          {
            "wrong": "He hurted his hand yesterday.",
            "right": "He hurt his hand yesterday.",
            "noteFa": "گذشتهٔ «hurt»، «cut»، «hit»، «put» و «read» از نظر نوشتار شبیه شکل ساده است و «-ed» نمی‌گیرد؛ تلفظ گذشتهٔ «read» متفاوت است."
          },
          {
            "wrong": "Did you went to the hospital?",
            "right": "Did you go to the hospital?",
            "noteFa": "بعد از «Did» شکل ساده فعل (go) می‌آید، نه شکل گذشته (went)!"
          }
        ],
        "timelineType": "past_point",
        "timelineCaptionFa": "گذشته ساده افعال بی‌قاعده (تغییر ریشه در مثبت، بازگشت به ریشه با Did/didn't)",
        "contextDialogue": {
          "lineA": "What happened to Reza? Did he break his arm yesterday?",
          "faA": "چه اتفاقی برای رضا افتاد؟ آیا دیروز دستش شکست؟",
          "lineB": "No, he fell off his bike and hurt his knee.",
          "faB": "نه، از دوچرخه‌اش افتاد و زانویش آسیب دید."
        },
        "guidedDiscovery": {
          "questionFa": "چرا فعل «hurt» با فاعل مفرد «he» حرف «s» نگرفته است؟",
          "options": [
            "چون زمان جمله گذشته است (hurt گذشته بی‌قاعده بدون تغییر است، نه حال ساده!)",
            "چون اشتباه چاپی است",
            "چون قبلش and آمده"
          ],
          "correctIdx": 0,
          "insightFa": "شاه‌کلید تستی! اگر hurt در حال ساده بود با he می‌شد «hurts»؛ نبودن s ثابت می‌کند زمان جمله گذشته ساده است!"
        },
        "threeD": {
          "formFa": "Irregular Past (went, saw, broke, fell, hurt, cut, put) | didn't / Did + شکل ساده",
          "meaningFa": "روایت حوادث، آسیب‌ها و وقایع تمام‌شده در گذشته",
          "useFa": "گزارش حوادث پزشکی و خاطرات گذشته؛ دقت ویژه به افعال بدون تغییر (hurt, cut, hit, put, shut)"
        },
        "learnerGuide": {
          "explainFa": "بعضی فعل‌ها در گذشته شکل بی‌قاعده دارند؛ برای نمونه go به went تغییر می‌کند و cut همان cut می‌ماند. در پرسش یا منفی با did و didn’t، حتی این فعل‌ها نیز به شکل ساده برمی‌گردند. ضمیر مفعولی پس از فعل می‌تواند جای نام فرد را بگیرد.",
          "examples": [
            {
              "en": "She went home.",
              "fa": "او به خانه رفت."
            },
            {
              "en": "She didn't go home.",
              "fa": "او به خانه نرفت."
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "p3_l1_1",
        "lesson": 1,
        "ruleTag": "پرسش از شخصیت درونی",
        "sentence": "What is your new classmate like? — He is very friendly and patient.",
        "target": "What is",
        "cloze": "_____ your new classmate like? — He is very friendly and patient.",
        "promptHint": "personality Q",
        "options": [
          "What is",
          "What does",
          "How does",
          "Who does"
        ],
        "fa": "هم‌کلاسی جدیدت چطور آدمی است؟ — بسیار صمیمی و صبور است.",
        "explainFa": "وقتی در جواب صفت اخلاقی (friendly, patient) آمده، سؤال «What is ... like?» است.",
        "chunks": [
          "What does",
          "your new classmate like?",
          "— He is",
          "very friendly and patient."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "What is",
        "flawedSentence": "What does your new classmate like? — He is very friendly and patient.",
        "matchLeft": "___ he like? (شخصیت)",
        "matchRight": "What is",
        "noTyping": true
      },
      {
        "id": "p3_l1_2",
        "lesson": 3,
        "ruleTag": "صفت ملکی جمع their",
        "sentence": "Reza and Ali are very neat; their room is always clean.",
        "target": "their",
        "cloze": "Reza and Ali are very neat; _____ room is always clean.",
        "promptHint": "possessive adj",
        "options": [
          "their",
          "his",
          "they",
          "them"
        ],
        "fa": "رضا و علی بسیار مرتب‌اند؛ اتاقشان همیشه تمیز است.",
        "explainFa": "برای مالک جمع (Reza and Ali) قبل از اسم (room) صفت ملکی «their» می‌آید.",
        "chunks": [
          "Reza and Ali",
          "are very neat;",
          "they",
          "room is always clean."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "their",
        "flawedSentence": "Reza and Ali are very neat; they room is always clean.",
        "matchLeft": "Reza & Ali (___ room)",
        "matchRight": "their",
        "noTyping": true
      },
      {
        "id": "p3_l1_3",
        "lesson": 3,
        "ruleTag": "صفت ملکی غیرجاندار its",
        "sentence": "Isfahan is a famous city. Its historical mosques are amazing.",
        "target": "Its",
        "cloze": "Isfahan is a famous city. _____ historical mosques are amazing.",
        "promptHint": "its vs it's",
        "options": [
          "Its",
          "It's",
          "Her",
          "Their"
        ],
        "fa": "اصفهان شهر مشهوری است. مساجد تاریخی آن شگفت‌انگیزند.",
        "explainFa": "صفت ملکی برای غیرانسان مفرد (Isfahan) بدون آپوستروف یعنی «Its» است.",
        "chunks": [
          "Isfahan is",
          "a famous city.",
          "Her",
          "historical mosques are amazing."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "Its",
        "flawedSentence": "Isfahan is a famous city. Her historical mosques are amazing.",
        "matchLeft": "صفت ملکی غیرجاندار",
        "matchRight": "its (بدون آپوستروف)"
      },
      {
        "id": "p3_l1_4",
        "lesson": 1,
        "ruleTag": "تطابق فعل to be جمع",
        "sentence": "My grandparents are very kind and hospitable people.",
        "target": "are",
        "cloze": "My grandparents _____ very kind and hospitable people.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "پدربزرگ و مادربزرگم انسان‌های بسیار مهربان و مهمان‌نوازی هستند.",
        "explainFa": "فاعل «My grandparents» جمع است؛ بنابراین «are» به کار می‌رود.",
        "chunks": [
          "My grandparents",
          "is",
          "very kind",
          "and hospitable people."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "My grandparents is very kind and hospitable people.",
        "matchLeft": "My parents ___ kind.",
        "matchRight": "are",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p3_l1_5",
        "lesson": 1,
        "ruleTag": "پرسش کوتاهی با Are",
        "sentence": "Are the firefighters brave and selfless? — Yes, they are.",
        "target": "they are",
        "cloze": "Are the firefighters brave and selfless? — Yes, _____.",
        "promptHint": "short answer",
        "options": [
          "they are",
          "they're",
          "they do",
          "he is"
        ],
        "fa": "آیا آتش‌نشانان شجاع و فداکارند؟ — بله، هستند.",
        "explainFa": "در پاسخ کوتاه مثبت انگلیسی شکل کامل «Yes, they are.» استاندارد است (مخفف Yes, they're غلط است!).",
        "chunks": [
          "Are the firefighters",
          "brave and",
          "selfless? — Yes,",
          "they're."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "they are.",
        "flawedSentence": "Are the firefighters brave and selfless? — Yes, they're.",
        "matchLeft": "پاسخ کوتاه مثبت جمع",
        "matchRight": "Yes, they are.",
        "noTyping": true
      },
      {
        "id": "p3_l2_1",
        "lesson": 2,
        "ruleTag": "نشانه Listen در حال استمراری",
        "sentence": "Listen! Someone is knocking at the front door right now.",
        "target": "is knocking",
        "cloze": "Listen! Someone _____ at the front door right now.",
        "promptHint": "present cont.",
        "options": [
          "is knocking",
          "knocks",
          "knocked",
          "are knocking"
        ],
        "fa": "گوش کن! همین الان کسی دارد به در ورودی می‌زند.",
        "explainFa": "نشانه «Listen!» و «right now» بیانگر حال استمراری است و «Someone» فعل مفرد «is» می‌گیرد.",
        "chunks": [
          "Listen! Someone",
          "are knocking",
          "at the front",
          "door right now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is knocking",
        "flawedSentence": "Listen! Someone are knocking at the front door right now.",
        "matchLeft": "Listen! + Someone",
        "matchRight": "is + V-ing",
        "noTyping": true
      },
      {
        "id": "p3_l2_2",
        "lesson": 2,
        "ruleTag": "املای افزودن ing",
        "sentence": "The passengers are sitting in the waiting room at the moment.",
        "target": "sitting",
        "cloze": "The passengers are _____ in the waiting room at the moment.",
        "promptHint": "spelling -ing",
        "options": [
          "sitting",
          "siting",
          "sit",
          "sits"
        ],
        "fa": "مسافران در این لحظه در سالن انتظار نشسته‌اند.",
        "explainFa": "فعل تک‌هجایی «sit» به الگوی همخوان-مصوت-همخوان ختم شده؛ پس حرف «t» تکرار می‌شود.",
        "chunks": [
          "The passengers are",
          "siting",
          "in the waiting room",
          "at the moment."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "sitting",
        "flawedSentence": "The passengers are siting in the waiting room at the moment.",
        "matchLeft": "sit + ing",
        "matchRight": "sitting",
        "noTyping": true
      },
      {
        "id": "p3_l2_3",
        "lesson": 2,
        "ruleTag": "پرسش حال استمراری",
        "sentence": "Why are the tourists taking their passports to the desk?",
        "target": "taking",
        "cloze": "Why are the tourists _____ their passports to the desk?",
        "promptHint": "V-ing spelling",
        "options": [
          "taking",
          "takeing",
          "take",
          "takes"
        ],
        "fa": "چرا گردشگران دارند گذرنامه‌هایشان را به میز پذیرش می‌برند؟",
        "explainFa": "در فعل «take» حرف «e» پایانی پیش از «-ing» حذف می‌شود: «taking».",
        "chunks": [
          "Why are the tourists",
          "takeing",
          "their passports",
          "to the desk?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "taking",
        "flawedSentence": "Why are the tourists takeing their passports to the desk?",
        "matchLeft": "take + ing",
        "matchRight": "taking",
        "noTyping": true
      },
      {
        "id": "p3_l2_4",
        "lesson": 2,
        "ruleTag": "منفی حال استمراری",
        "sentence": "Mr. Rahimi isn't checking the passports; he is talking to the pilot.",
        "target": "isn't checking",
        "cloze": "Mr. Rahimi _____ the passports; he is talking to the pilot.",
        "promptHint": "neg. cont.",
        "options": [
          "isn't checking",
          "not checking",
          "isn't check",
          "aren't checking"
        ],
        "fa": "آقای رحیمی مشغول بررسی گذرنامه‌ها نیست؛ او دارد با خلبان صحبت می‌کند.",
        "explainFa": "با ادامه جمله در حال استمراری (is talking)، بخش اول نیز «isn't checking» است.",
        "chunks": [
          "Mr. Rahimi",
          "not checking",
          "the passports; he is",
          "talking to the pilot."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "isn't checking",
        "flawedSentence": "Mr. Rahimi not checking the passports; he is talking to the pilot.",
        "matchLeft": "He ___ working now.",
        "matchRight": "isn't",
        "noTyping": true
      },
      {
        "id": "p3_l2_5",
        "lesson": 2,
        "ruleTag": "املای فعل مختوم به ie در ing",
        "sentence": "Look! A wounded bird is lying on the grass.",
        "target": "lying",
        "cloze": "Look! A wounded bird is _____ on the grass.",
        "promptHint": "lie + ing",
        "options": [
          "lying",
          "lieing",
          "laying",
          "lies"
        ],
        "fa": "نگاه کن! پرنده زخمی روی چمن دراز کشیده است.",
        "explainFa": "در افعال «lie, die, tie» هنگام افزودن «-ing»، حروف «ie» به «y» تبدیل می‌شوند: «lying, dying, tying».",
        "chunks": [
          "Look! A",
          "wounded bird is",
          "lieing",
          "on the grass."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "lying",
        "flawedSentence": "Look! A wounded bird is lieing on the grass.",
        "matchLeft": "lie / die + ing",
        "matchRight": "lying / dying"
      },
      {
        "id": "p3_l3_1",
        "lesson": 3,
        "ruleTag": "حذف s بعد از doesn't",
        "sentence": "My sister doesn't eat fast food because she cares about health.",
        "target": "eat",
        "cloze": "My sister doesn't _____ fast food because she cares about health.",
        "promptHint": "after doesn't",
        "options": [
          "eat",
          "eats",
          "eating",
          "ate"
        ],
        "fa": "خواهرم فست‌فود نمی‌خورد چون به سلامتی اهمیت می‌دهد.",
        "explainFa": "بعد از «doesn't» حرف «s» سوم‌شخص حذف شده و فعل ساده «eat» می‌آید.",
        "chunks": [
          "My sister doesn't",
          "eats",
          "fast food because she",
          "cares about health."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "eat",
        "flawedSentence": "My sister doesn't eats fast food because she cares about health.",
        "matchLeft": "doesn't + ___",
        "matchRight": "eat (فعل ساده)",
        "noTyping": true
      },
      {
        "id": "p3_l3_2",
        "lesson": 4,
        "ruleTag": "جایگاه قید تکرار",
        "sentence": "Our English teacher is always punctual and energetic.",
        "target": "is always",
        "cloze": "Our English teacher _____ punctual and energetic.",
        "promptHint": "adverb position",
        "options": [
          "is always",
          "always is",
          "always be",
          "be always"
        ],
        "fa": "دبیر زبان ما همیشه وقت‌شناس و پرانرژی است.",
        "explainFa": "در جملهٔ عادی (بدون تأکید) قید تکرار بعد از «am / is / are» می‌آید، نه قبل از آن‌ها: «is always». «always is» فقط با تأکید گفتاری شنیده می‌شود و جواب کتاب نیست.",
        "chunks": [
          "Our English",
          "teacher",
          "always is",
          "punctual and energetic."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is always",
        "flawedSentence": "Our English teacher always is punctual and energetic.",
        "matchLeft": "جایگاه always با is",
        "matchRight": "is always",
        "noTyping": true
      },
      {
        "id": "p3_l3_3",
        "lesson": 4,
        "ruleTag": "قید تکرار منفی never",
        "sentence": "Pious people never tell lies to others.",
        "target": "never tell",
        "cloze": "Pious people _____ lies to others.",
        "promptHint": "never + verb",
        "options": [
          "never tell",
          "don't never tell",
          "never tells",
          "tell never"
        ],
        "fa": "افراد درستکار هرگز به دیگران دروغ نمی‌گویند.",
        "explainFa": "«never» خودش جمله را منفی می‌کند (بدون don't) و قبل از فعل اصلی «tell» می‌آید.",
        "chunks": [
          "Pious people",
          "don't never",
          "tell lies",
          "to others."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "never",
        "flawedSentence": "Pious people don't never tell lies to others.",
        "matchLeft": "فاعل جمع + never",
        "matchRight": "never tell"
      },
      {
        "id": "p3_l3_4",
        "lesson": 3,
        "ruleTag": "املای es در سوم‌شخص",
        "sentence": "My mother usually watches TV after dinner.",
        "target": "watches",
        "cloze": "My mother usually _____ TV after dinner.",
        "promptHint": "3rd person -es",
        "options": [
          "watches",
          "watchs",
          "watch",
          "watching"
        ],
        "fa": "مادرم معمولاً بعد از شام تلویزیون تماشا می‌کند.",
        "explainFa": "افعال مختوم به «ch, sh, s, x, o» در سوم‌شخص مفرد «-es» می‌گیرند.",
        "chunks": [
          "My mother",
          "usually",
          "watchs",
          "TV after dinner."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "watches",
        "flawedSentence": "My mother usually watchs TV after dinner.",
        "matchLeft": "watch + سوم‌شخص",
        "matchRight": "watches",
        "noTyping": true
      },
      {
        "id": "p3_l3_5",
        "lesson": 4,
        "ruleTag": "پرسش تکرار با How often",
        "sentence": "How often do Iranians celebrate Nature Day? — Once a year.",
        "target": "How often",
        "cloze": "_____ do Iranians celebrate Nature Day? — Once a year.",
        "promptHint": "frequency Q",
        "options": [
          "How often",
          "How many",
          "When",
          "What time"
        ],
        "fa": "ایرانیان هر چند وقت یک‌بار روز طبیعت را جشن می‌گیرند؟ — سالی یک‌بار.",
        "explainFa": "وقتی پاسخ دفعات تکرار (Once a year / twice a week) باشد، سؤال با «How often» آغاز می‌شود.",
        "chunks": [
          "How many",
          "do Iranians celebrate",
          "Nature Day? —",
          "Once a year."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How often",
        "flawedSentence": "How many do Iranians celebrate Nature Day? — Once a year.",
        "matchLeft": "پاسخ: Twice a week",
        "matchRight": "How often",
        "noTyping": true
      },
      {
        "id": "p3_l4_1",
        "lesson": 4,
        "ruleTag": "فعل ساده پس از does در پرسش Wh",
        "sentence": "What time does the central post office open on Saturdays?",
        "target": "open",
        "cloze": "What time does the central post office _____ on Saturdays?",
        "promptHint": "does + base verb",
        "options": [
          "open",
          "opens",
          "opening",
          "to open"
        ],
        "fa": "اداره پست مرکزی شنبه‌ها چه ساعتی باز می‌شود؟",
        "explainFa": "بعد از «does» فعل اصلی به شکل ساده می‌آید: «does … open»؛ «s» فقط یک بار (روی does) می‌نشیند.",
        "chunks": [
          "What time does the",
          "central post office",
          "opens",
          "on Saturdays?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "open",
        "flawedSentence": "What time does the central post office opens on Saturdays?",
        "matchLeft": "What time does it",
        "matchRight": "open?",
        "noTyping": true
      },
      {
        "id": "p3_l4_2",
        "lesson": 4,
        "ruleTag": "جمله امری منفی Don't",
        "sentence": "Don't cross the street when the traffic light is red!",
        "target": "Don't",
        "cloze": "_____ cross the street when the traffic light is red!",
        "promptHint": "imperative (-)",
        "options": [
          "Don't",
          "Doesn't",
          "Not",
          "Aren't"
        ],
        "fa": "وقتی چراغ راهنمایی قرمز است از خیابان عبور نکنید!",
        "explainFa": "در الگوی دستور منفی این درس از «Don’t + فعل ساده» استفاده می‌کنیم.",
        "chunks": [
          "Doesn't",
          "cross the street",
          "when the traffic",
          "light is red!"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Don't",
        "flawedSentence": "Doesn't cross the street when the traffic light is red!",
        "matchLeft": "امری منفی",
        "matchRight": "Don't + فعل ساده",
        "noTyping": true
      },
      {
        "id": "p3_l4_3",
        "lesson": 4,
        "ruleTag": "جمله امری مثبت",
        "sentence": "Please fill out this application form with a black pen.",
        "target": "fill",
        "cloze": "Please _____ out this application form with a black pen.",
        "promptHint": "imperative (+)",
        "options": [
          "fill",
          "fills",
          "to fill",
          "filling"
        ],
        "fa": "لطفاً این فرم درخواست را با خودکار مشکی پر کنید.",
        "explainFa": "جمله امری مستقیم بعد از «Please» با شکل ساده فعل بدون «to» یا «s» شروع می‌شود.",
        "chunks": [
          "Please",
          "to fill",
          "out this application form",
          "with a black pen."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "fill",
        "flawedSentence": "Please to fill out this application form with a black pen.",
        "matchLeft": "Please ___ the door.",
        "matchRight": "open / fill",
        "noTyping": true
      },
      {
        "id": "p3_l4_4",
        "lesson": 4,
        "ruleTag": "پرسش مکان با Where",
        "sentence": "Where do your cousins live? — They live in Mashhad.",
        "target": "Where do",
        "cloze": "_____ your cousins live? — They live in Mashhad.",
        "promptHint": "Wh + do",
        "options": [
          "Where do",
          "Where does",
          "When do",
          "Where are"
        ],
        "fa": "پسرعموهایت کجا زندگی می‌کنند؟ — در مشهد زندگی می‌کنند.",
        "explainFa": "چون پاسخ مکان (in Mashhad) و فاعل جمع (your cousins) با فعل اصلی «live» است، «Where do» صحیح است.",
        "chunks": [
          "Where does",
          "your cousins live?",
          "— They",
          "live in Mashhad."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Where do",
        "flawedSentence": "Where does your cousins live? — They live in Mashhad.",
        "matchLeft": "___ they live?",
        "matchRight": "Where do"
      },
      {
        "id": "p3_l4_5",
        "lesson": 4,
        "ruleTag": "پرسش فاعلی Who بدون do/does",
        "sentence": "Who helps the passengers at the airport information desk?",
        "target": "helps",
        "cloze": "Who _____ the passengers at the airport information desk?",
        "promptHint": "Who as subject",
        "options": [
          "helps",
          "does helps",
          "do help",
          "helping"
        ],
        "fa": "چه کسی در میز اطلاعات فرودگاه به مسافران کمک می‌کند؟",
        "explainFa": "وقتی «Who» خودش فاعل جمله است، «do / does» نمی‌آید و فعل مفرد «helps» می‌گیرد!",
        "chunks": [
          "Who",
          "does helps",
          "the passengers at the",
          "airport information desk?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "helps",
        "flawedSentence": "Who does helps the passengers at the airport information desk?",
        "matchLeft": "Who (فاعل) + ___",
        "matchRight": "فعل با s سوم‌شخص",
        "noTyping": true
      },
      {
        "id": "p3_l5_1",
        "lesson": 5,
        "ruleTag": "املای گذشته باقاعده -ied",
        "sentence": "Narges studied hard for her final exam last night.",
        "target": "studied",
        "cloze": "Narges _____ hard for her final exam last night.",
        "promptHint": "regular past",
        "options": [
          "studied",
          "studyed",
          "studies",
          "study"
        ],
        "fa": "نرگس دیشب برای امتحان پایانی‌اش سخت مطالعه کرد.",
        "explainFa": "با قید «last night» گذشته ساده داریم و در «study» حرف «y» بعد از همخوان به «-ied» تبدیل می‌شود.",
        "chunks": [
          "Narges",
          "studyed",
          "hard for her final",
          "exam last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "studied",
        "flawedSentence": "Narges studyed hard for her final exam last night.",
        "matchLeft": "study + ed",
        "matchRight": "studied",
        "noTyping": true
      },
      {
        "id": "p3_l5_2",
        "lesson": 5,
        "ruleTag": "فعل ساده بعد از didn't",
        "sentence": "We didn't download that file because it was unsafe.",
        "target": "download",
        "cloze": "We didn't _____ that file because it was unsafe.",
        "promptHint": "after didn't",
        "options": [
          "download",
          "downloaded",
          "downloads",
          "downloading"
        ],
        "fa": "ما آن فایل را دانلود نکردیم چون ناامن بود.",
        "explainFa": "پس از «didn't» فعل حتماً بدون «-ed» و به شکل ساده می‌آید.",
        "chunks": [
          "We didn't",
          "downloaded",
          "that file because",
          "it was unsafe."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "download",
        "flawedSentence": "We didn't downloaded that file because it was unsafe.",
        "matchLeft": "didn't + ___",
        "matchRight": "download (ساده)",
        "noTyping": true
      },
      {
        "id": "p3_l5_3",
        "lesson": 5,
        "ruleTag": "گذشته to be جمع were",
        "sentence": "Were all the students in the computer lab two hours ago?",
        "target": "Were",
        "cloze": "_____ all the students in the computer lab two hours ago?",
        "promptHint": "was / were",
        "options": [
          "Were",
          "Was",
          "Did",
          "Are"
        ],
        "fa": "آیا دو ساعت پیش همه دانش‌آموزان در کارگاه رایانه بودند؟",
        "explainFa": "چون فعل اصلی نداریم و فاعل «all the students» جمع و زمان «two hours ago» گذشته است، «Were» صحیح است.",
        "chunks": [
          "Did",
          "all the students",
          "in the computer lab",
          "two hours ago?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Were",
        "flawedSentence": "Did all the students in the computer lab two hours ago?",
        "matchLeft": "___ they at home yesterday?",
        "matchRight": "Were"
      },
      {
        "id": "p3_l5_4",
        "lesson": 5,
        "ruleTag": "منفی گذشته to be",
        "sentence": "The internet connection wasn't fast yesterday morning.",
        "target": "wasn't",
        "cloze": "The internet connection _____ fast yesterday morning.",
        "promptHint": "wasn't / didn't",
        "options": [
          "wasn't",
          "didn't",
          "weren't",
          "isn't"
        ],
        "fa": "اتصال اینترنت دیروز صبح سریع نبود.",
        "explainFa": "چون فعل اصلی نداریم و صفت «fast» با فاعل مفرد در گذشته آمده، «wasn't» صحیح است (نه didn't!).",
        "chunks": [
          "The internet",
          "connection",
          "didn't",
          "fast yesterday morning."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "wasn't",
        "flawedSentence": "The internet connection didn't fast yesterday morning.",
        "matchLeft": "It ___ fast yesterday.",
        "matchRight": "wasn't"
      },
      {
        "id": "p3_l5_5",
        "lesson": 5,
        "ruleTag": "تکرار حرف پایانی در ed",
        "sentence": "The police stopped the careless driver near the school yesterday.",
        "target": "stopped",
        "cloze": "The police _____ the careless driver near the school yesterday.",
        "promptHint": "stop + ed",
        "options": [
          "stopped",
          "stoped",
          "stops",
          "stopping"
        ],
        "fa": "پلیس دیروز راننده بی‌احتیاط را نزدیک مدرسه متوقف کرد.",
        "explainFa": "در فعل تک‌هجایی CVC «stop» پیش از «-ed» حرف «p» تکرار می‌شود: «stopped».",
        "chunks": [
          "The police",
          "stoped",
          "the careless driver near",
          "the school yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "stopped",
        "flawedSentence": "The police stoped the careless driver near the school yesterday.",
        "matchLeft": "stop / plan + ed",
        "matchRight": "stopped / planned"
      },
      {
        "id": "p3_l6_1",
        "lesson": 6,
        "ruleTag": "گذشته بی‌قاعده بدون تغییر hurt",
        "sentence": "Poor Omid fell down the stairs and hurt his ankle yesterday.",
        "target": "hurt",
        "cloze": "Poor Omid fell down the stairs and _____ his ankle yesterday.",
        "promptHint": "irregular past",
        "options": [
          "hurt",
          "hurted",
          "hurts",
          "is hurting"
        ],
        "fa": "امید بیچاره دیروز از پله‌ها افتاد و مچ پایش آسیب دید.",
        "explainFa": "گذشته فعل بی‌قاعده «hurt» همان «hurt» است (در گذشته سوم‌شخص s نمی‌گیرد و hurted غلط است!).",
        "chunks": [
          "Poor Omid fell down",
          "the stairs and",
          "hurted",
          "his ankle yesterday."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "hurt",
        "flawedSentence": "Poor Omid fell down the stairs and hurted his ankle yesterday.",
        "matchLeft": "گذشته فعل hurt / cut",
        "matchRight": "hurt / cut",
        "noTyping": true
      },
      {
        "id": "p3_l6_2",
        "lesson": 6,
        "ruleTag": "پرسش گذشته با Did",
        "sentence": "Did the nurse put a plaster on the child's hand?",
        "target": "put",
        "cloze": "Did the nurse _____ a plaster on the child's hand?",
        "promptHint": "Did + base",
        "options": [
          "put",
          "puts",
          "putted",
          "putting"
        ],
        "fa": "آیا پرستار چسب زخم روی دست کودک گذاشت؟",
        "explainFa": "همراه «Did» شکل ساده فعل «put» می‌آید (واژه putted در انگلیسی وجود ندارد).",
        "chunks": [
          "Did the nurse",
          "puts",
          "a plaster on",
          "the child's hand?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "put",
        "flawedSentence": "Did the nurse puts a plaster on the child's hand?",
        "matchLeft": "Did she ___?",
        "matchRight": "put / go (ساده)",
        "noTyping": true
      },
      {
        "id": "p3_l6_3",
        "lesson": 6,
        "ruleTag": "گذشته بی‌قاعده broke",
        "sentence": "Be careful! Somebody broke the classroom window an hour ago.",
        "target": "broke",
        "cloze": "Be careful! Somebody _____ the classroom window an hour ago.",
        "promptHint": "irregular past",
        "options": [
          "broke",
          "breaked",
          "breaks",
          "broken"
        ],
        "fa": "مراقب باش! یک ساعت پیش کسی شیشه کلاس را شکست.",
        "explainFa": "با نشانه «an hour ago» گذشته ساده فعل بی‌قاعده «break» یعنی «broke» درست است.",
        "chunks": [
          "Be careful! Somebody",
          "breaked",
          "the classroom window",
          "an hour ago."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "broke",
        "flawedSentence": "Be careful! Somebody breaked the classroom window an hour ago.",
        "matchLeft": "گذشته ساده break",
        "matchRight": "broke",
        "noTyping": true
      },
      {
        "id": "p3_l6_4",
        "lesson": 6,
        "ruleTag": "گذشته بی‌قاعده went",
        "sentence": "Last Friday, we went to the emergency room to visit our uncle.",
        "target": "went",
        "cloze": "Last Friday, we _____ to the emergency room to visit our uncle.",
        "promptHint": "irregular past",
        "options": [
          "went",
          "goed",
          "go",
          "goes"
        ],
        "fa": "جمعه گذشته برای عیادت عمویمان به اورژانس رفتیم.",
        "explainFa": "گذشته فعل بی‌قاعده «go» واژه «went» است (واژه goed وجود ندارد!).",
        "chunks": [
          "Last Friday, we",
          "goed",
          "to the emergency room",
          "to visit our uncle."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "went",
        "flawedSentence": "Last Friday, we goed to the emergency room to visit our uncle.",
        "matchLeft": "گذشته ساده go",
        "matchRight": "went",
        "noTyping": true
      },
      {
        "id": "p3_l6_5",
        "lesson": 6,
        "ruleTag": "گذشته بی‌قاعده saw و called",
        "sentence": "As soon as Mina saw the accident, she called emergency 115.",
        "target": "saw",
        "cloze": "As soon as Mina _____ the accident, she called emergency 115.",
        "promptHint": "past of see",
        "options": [
          "saw",
          "seed",
          "sees",
          "seen"
        ],
        "fa": "به محض اینکه مینا تصادف را دید، با اورژانس ۱۱۵ تماس گرفت.",
        "explainFa": "گذشته ساده فعل بی‌قاعده «see» واژه «saw» است («seen» اسم مفعول است و بدون have/has نمی‌آید!).",
        "chunks": [
          "As soon as Mina",
          "seen",
          "the accident, she",
          "called emergency 115."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "saw",
        "flawedSentence": "As soon as Mina seen the accident, she called emergency 115.",
        "matchLeft": "گذشته ساده see",
        "matchRight": "saw"
      },
      {
        "id": "p3_l1_6",
        "lesson": 1,
        "ruleTag": "پرسش شخصیت با What is",
        "sentence": "What is your brother like? — He is tall and funny.",
        "target": "is",
        "cloze": "What _____ your brother like? — He is tall and funny.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "does",
          "do"
        ],
        "fa": "برادرت چطور آدمی است؟ — قدبلند و بامزه است.",
        "explainFa": "پاسخ دربارهٔ ویژگی‌های اوست، پس «What is … like?» درست است؛ «What does … like?» یعنی «چه چیزی را دوست دارد؟».",
        "chunks": [
          "What",
          "does",
          "your brother like? — He",
          "is tall and funny."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "What does your brother like? — He is tall and funny.",
        "matchLeft": "What",
        "matchRight": "is your brother like?"
      },
      {
        "id": "p3_l1_7",
        "lesson": 1,
        "ruleTag": "صفت شخصیتی با is",
        "sentence": "She is very helpful to her classmates.",
        "target": "is",
        "cloze": "She _____ very helpful to her classmates.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "او به هم‌کلاسی‌هایش خیلی کمک‌کننده است.",
        "explainFa": "«She» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "She",
          "are",
          "very helpful to",
          "her classmates."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "She are very helpful to her classmates.",
        "matchLeft": "She",
        "matchRight": "is very helpful",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p3_l1_8",
        "lesson": 1,
        "ruleTag": "صفت شخصیتی جمع با are",
        "sentence": "My parents are generous and hospitable.",
        "target": "are",
        "cloze": "My parents _____ generous and hospitable.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "والدینم سخاوتمند و مهمان‌نوازند.",
        "explainFa": "«My parents» جمع است و «are» می‌گیرد.",
        "chunks": [
          "My parents",
          "is",
          "generous and",
          "hospitable."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "My parents is generous and hospitable.",
        "matchLeft": "My parents",
        "matchRight": "are generous and hospitable",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p3_l1_9",
        "lesson": 3,
        "ruleTag": "صفت ملکی با اسم مفرد",
        "sentence": "His wife is a kind and patient teacher.",
        "target": "wife",
        "cloze": "His _____ is a kind and patient teacher.",
        "promptHint": "wife (شکل درست)",
        "options": [
          "wife",
          "wives",
          "wifes",
          "wife's"
        ],
        "fa": "همسرش معلمی مهربان و صبور است.",
        "explainFa": "«His» با اسم مفرد «wife» به‌کار می‌رود.",
        "chunks": [
          "His",
          "wives",
          "is a kind",
          "and patient teacher."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wife",
        "flawedSentence": "His wives is a kind and patient teacher.",
        "matchLeft": "His",
        "matchRight": "wife is a kind and patient teacher"
      },
      {
        "id": "p3_l1_10",
        "lesson": 3,
        "ruleTag": "صفت ملکی با اسم جمع",
        "sentence": "Their windows are very clean and bright.",
        "target": "windows",
        "cloze": "Their _____ are very clean and bright.",
        "promptHint": "window",
        "options": [
          "windows",
          "window",
          "windowes",
          "window's"
        ],
        "fa": "پنجره‌هایشان خیلی تمیز و روشنند.",
        "explainFa": "«Their» با اسم جمع «windows» به‌کار می‌رود.",
        "chunks": [
          "Their",
          "window",
          "are very clean",
          "and bright."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "windows",
        "flawedSentence": "Their window are very clean and bright.",
        "matchLeft": "Their",
        "matchRight": "windows are very clean and bright"
      },
      {
        "id": "p3_l1_11",
        "lesson": 1,
        "ruleTag": "پاسخ کوتاه مثبت بدون مخفف",
        "sentence": "Are your friends helpful? — Yes, they are.",
        "target": "they",
        "cloze": "Are your friends helpful? — Yes, _____ are.",
        "promptHint": "they",
        "options": [
          "they",
          "them",
          "their",
          "it"
        ],
        "fa": "آیا دوستانت کمک‌کننده‌اند؟ — بله، آن‌ها هستند.",
        "explainFa": "در پاسخ کوتاه مثبت، فعل «be» را مخفف نمی‌کنیم: «Yes, they are».",
        "chunks": [
          "Are your friends",
          "helpful? — Yes,",
          "them",
          "are."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "they",
        "flawedSentence": "Are your friends helpful? — Yes, them are.",
        "matchLeft": "Are your friends helpful",
        "matchRight": "yes, they are",
        "noTyping": true
      },
      {
        "id": "p3_l1_12",
        "lesson": 3,
        "ruleTag": "our با اسم مفرد",
        "sentence": "Our garden is very beautiful in spring.",
        "target": "garden",
        "cloze": "Our _____ is very beautiful in spring.",
        "promptHint": "garden (شکل درست)",
        "options": [
          "garden",
          "gardens",
          "garden's",
          "a garden"
        ],
        "fa": "باغ ما در بهار خیلی زیباست.",
        "explainFa": "«Our» با اسم مفرد «garden» به‌کار می‌رود.",
        "chunks": [
          "Our",
          "gardens",
          "is very beautiful",
          "in spring."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "garden",
        "flawedSentence": "Our gardens is very beautiful in spring.",
        "matchLeft": "Our",
        "matchRight": "garden is very beautiful in spring"
      },
      {
        "id": "p3_l1_13",
        "lesson": 1,
        "ruleTag": "to be با it",
        "sentence": "It is a very useful book for students.",
        "target": "is",
        "cloze": "It _____ a very useful book for students.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "این کتاب برای دانش‌آموزان خیلی مفید است.",
        "explainFa": "«It» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "It",
          "are",
          "a very useful",
          "book for students."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "It are a very useful book for students.",
        "matchLeft": "It",
        "matchRight": "is a very useful book",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p3_l1_14",
        "lesson": 1,
        "ruleTag": "صفت انسانی با is",
        "sentence": "My teacher is very strict with us.",
        "target": "is",
        "cloze": "My teacher _____ very strict with us.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "معلم ما با ما خیلی سخت‌گیر است.",
        "explainFa": "«My teacher» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "My teacher",
          "are",
          "very strict",
          "with us."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "My teacher are very strict with us.",
        "matchLeft": "My teacher",
        "matchRight": "is very strict with us",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p3_l1_15",
        "lesson": 1,
        "ruleTag": "اسم جمع با those",
        "sentence": "Those students are really quiet and polite.",
        "target": "students",
        "cloze": "Those _____ are really quiet and polite.",
        "promptHint": "student",
        "options": [
          "students",
          "student",
          "students'",
          "student's"
        ],
        "fa": "آن دانش‌آموزان واقعاً ساکت و مؤدبند.",
        "explainFa": "اسم جمع «students» با «Those» و فعل «are» به‌کار می‌رود.",
        "chunks": [
          "Those",
          "student",
          "are really quiet",
          "and polite."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "students",
        "flawedSentence": "Those student are really quiet and polite.",
        "matchLeft": "Those",
        "matchRight": "students are really quiet and polite"
      },
      {
        "id": "p3_l1_16",
        "lesson": 1,
        "ruleTag": "منفی to be با فاعل مفرد (isn't)",
        "sentence": "Reza isn't lazy at all; he does his homework every day.",
        "target": "isn't",
        "cloze": "Reza _____ lazy at all; he does his homework every day.",
        "promptHint": "be",
        "options": [
          "isn't",
          "aren't",
          "doesn't",
          "don't"
        ],
        "fa": "رضا اصلاً تنبل نیست؛ هر روز تکالیفش را انجام می‌دهد.",
        "explainFa": "فاعل مفرد (Reza) + صفت (lazy) ← منفیِ to be: «isn't»؛ با صفت از «doesn't / don't» استفاده نمی‌کنیم.",
        "chunks": [
          "Reza",
          "doesn't",
          "lazy at all; he does",
          "his homework every day."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "isn't",
        "flawedSentence": "Reza doesn't lazy at all; he does his homework every day.",
        "matchLeft": "Reza ___ lazy (منفی)",
        "matchRight": "isn't"
      },
      {
        "id": "p3_l1_17",
        "lesson": 1,
        "ruleTag": "پرسش بله/خیر با Are و صفت",
        "sentence": "Are your parents patient with you?",
        "target": "Are",
        "cloze": "_____ your parents patient with you?",
        "promptHint": "be",
        "options": [
          "Are",
          "Do",
          "Is",
          "Does"
        ],
        "fa": "آیا پدر و مادرت با تو صبور هستند؟",
        "explainFa": "فاعل جمع (your parents) + صفت (patient) ← پرسشِ to be با «Are»؛ با صفت، «Do / Does» نمی‌آید.",
        "chunks": [
          "Do",
          "your parents",
          "patient",
          "with",
          "you?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Are",
        "flawedSentence": "Do your parents patient with you?",
        "matchLeft": "___ your parents patient?",
        "matchRight": "Are",
        "altAnswers": [
          "Were"
        ]
      },
      {
        "id": "p3_l2_6",
        "lesson": 2,
        "ruleTag": "حذف e بی‌صدا در ing",
        "sentence": "She is making a cake for the birthday party.",
        "target": "is making",
        "cloze": "She _____ a cake for the birthday party.",
        "promptHint": "make",
        "options": [
          "is making",
          "is makeing",
          "are making",
          "is made"
        ],
        "fa": "او برای جشن تولد کیک درست می‌کند.",
        "explainFa": "حرف «e» بی‌صدا در پایان فعل حذف می‌شود: make + ing = making.",
        "chunks": [
          "She",
          "is makeing",
          "a cake for",
          "the birthday party."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is making",
        "flawedSentence": "She is makeing a cake for the birthday party.",
        "matchLeft": "She",
        "matchRight": "is making a cake"
      },
      {
        "id": "p3_l2_7",
        "lesson": 2,
        "ruleTag": "توافق are در حال استمراری",
        "sentence": "They are swimming in the pool now.",
        "target": "are",
        "cloze": "They _____ swimming in the pool now.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "آن‌ها الان در استخر شنا می‌کنند.",
        "explainFa": "«They» جمع است و «are» می‌گیرد.",
        "chunks": [
          "They",
          "is",
          "swimming in the",
          "pool now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "They is swimming in the pool now.",
        "matchLeft": "They",
        "matchRight": "are swimming in the pool"
      },
      {
        "id": "p3_l2_8",
        "lesson": 2,
        "ruleTag": "گریه کردن با is",
        "sentence": "Look! The baby is crying in the cradle.",
        "target": "is",
        "cloze": "Look! The baby _____ crying in the cradle.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "نگاه کن! نوزاد در گهواره گریه می‌کند.",
        "explainFa": "«The baby» مفرد است و «is» می‌گیرد.",
        "chunks": [
          "Look! The baby",
          "are",
          "crying in",
          "the cradle."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Look! The baby are crying in the cradle.",
        "matchLeft": "Look",
        "matchRight": "the baby is crying"
      },
      {
        "id": "p3_l2_9",
        "lesson": 2,
        "ruleTag": "گفت‌وگو با am",
        "sentence": "I am talking to the teacher right now.",
        "target": "am talking",
        "cloze": "I _____ to the teacher right now.",
        "promptHint": "talk",
        "options": [
          "am talking",
          "is talking",
          "are talking",
          "am talk"
        ],
        "fa": "من همین الان با معلم حرف می‌زنم.",
        "explainFa": "با «I» فعل «am» می‌آید و پس از آن شکل ing قرار می‌گیرد.",
        "chunks": [
          "I",
          "is talking",
          "to the teacher",
          "right now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am talking",
        "flawedSentence": "I is talking to the teacher right now.",
        "matchLeft": "I",
        "matchRight": "am talking to the teacher"
      },
      {
        "id": "p3_l2_10",
        "lesson": 2,
        "ruleTag": "پرسش علت با are",
        "sentence": "Why are the students running in the yard?",
        "target": "are",
        "cloze": "Why _____ the students running in the yard?",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "does"
        ],
        "fa": "چرا دانش‌آموزان در حیاط می‌دوند؟",
        "explainFa": "«the students» جمع است و «are» می‌گیرد.",
        "chunks": [
          "Why",
          "is",
          "the students running",
          "in the yard?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "Why is the students running in the yard?",
        "matchLeft": "Why",
        "matchRight": "are the students running",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p3_l2_11",
        "lesson": 2,
        "ruleTag": "املای lying",
        "sentence": "My brother is lying on the sofa now.",
        "target": "is",
        "cloze": "My brother _____ lying on the sofa now.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "fa": "برادرم الان روی مبل دراز کشیده است.",
        "explainFa": "فعل «lie» با تکرار حرف آخر به «lying» تبدیل می‌شود.",
        "chunks": [
          "My brother",
          "are",
          "lying on the",
          "sofa now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "My brother are lying on the sofa now.",
        "matchLeft": "My brother",
        "matchRight": "is lying on the sofa"
      },
      {
        "id": "p3_l2_12",
        "lesson": 2,
        "ruleTag": "ساختن با are",
        "sentence": "The workers are building a new bridge.",
        "target": "are",
        "cloze": "The workers _____ building a new bridge.",
        "promptHint": "be",
        "options": [
          "are",
          "is",
          "am",
          "be"
        ],
        "fa": "کارگران در حال ساخت پل جدیدی هستند.",
        "explainFa": "«The workers» جمع است و «are» می‌گیرد.",
        "chunks": [
          "The workers",
          "is",
          "building a",
          "new bridge."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "The workers is building a new bridge.",
        "matchLeft": "The workers",
        "matchRight": "are building a new bridge",
        "altAnswers": [
          "were"
        ]
      },
      {
        "id": "p3_l2_13",
        "lesson": 2,
        "ruleTag": "پرسش با you",
        "sentence": "What are you doing in the library?",
        "target": "are",
        "cloze": "What _____ you doing in the library?",
        "promptHint": "do",
        "options": [
          "are",
          "is",
          "am",
          "does"
        ],
        "fa": "در کتابخانه چه کار می‌کنی؟",
        "explainFa": "ضمیر «you» با «are» می‌آید.",
        "chunks": [
          "What",
          "is",
          "you doing in",
          "the library?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "What is you doing in the library?",
        "matchLeft": "What",
        "matchRight": "are you doing in the library",
        "noTyping": true
      },
      {
        "id": "p3_l2_14",
        "lesson": 2,
        "ruleTag": "منفی حال استمراری با aren't",
        "sentence": "The children aren't playing in the garden.",
        "target": "aren't",
        "cloze": "The children _____ playing in the garden.",
        "promptHint": "are",
        "options": [
          "aren't",
          "isn't",
          "don't",
          "not are"
        ],
        "fa": "بچه‌ها در باغ بازی نمی‌کنند.",
        "explainFa": "با «children» جمع، شکل منفی «aren't» به‌کار می‌رود.",
        "chunks": [
          "The children",
          "isn't",
          "playing in",
          "the garden."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "aren't",
        "flawedSentence": "The children isn't playing in the garden.",
        "matchLeft": "The children",
        "matchRight": "aren't playing in the garden",
        "altAnswers": [
          "weren't"
        ]
      },
      {
        "id": "p3_l2_15",
        "lesson": 2,
        "ruleTag": "منفی با am",
        "sentence": "I am not sleeping now; I am studying.",
        "target": "am",
        "cloze": "I _____ not sleeping now; I am studying.",
        "promptHint": "be",
        "options": [
          "am",
          "is",
          "are",
          "do"
        ],
        "fa": "من الان خواب نیستم؛ دارم درس می‌خوانم.",
        "explainFa": "با «I» شکل منفی «am not» به‌کار می‌رود.",
        "chunks": [
          "I",
          "is",
          "not sleeping now;",
          "I am studying."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "am",
        "flawedSentence": "I is not sleeping now; I am studying.",
        "matchLeft": "I",
        "matchRight": "am not sleeping now"
      },
      {
        "id": "p3_l2_16",
        "lesson": 2,
        "ruleTag": "مالکیت با ’s برای اسم خاص",
        "sentence": "Kate's scarf is blue and white.",
        "target": "Kate's",
        "cloze": "_____ scarf is blue and white.",
        "promptHint": "Kate",
        "options": [
          "Kate's",
          "Kates",
          "Kate",
          "Kates'"
        ],
        "fa": "روسری کیت آبی و سفید است.",
        "explainFa": "قاعدهٔ این درس (کتاب ص ۳۶): مالکیتِ انسان با «’s» ساخته می‌شود: «Kate's scarf»؛ «Kates» بدون آپاستروف یعنی چند نفر به نام کیت، نه مالکیت.",
        "chunks": [
          "Kates",
          "scarf is",
          "blue",
          "and",
          "white."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Kate's",
        "flawedSentence": "Kates scarf is blue and white.",
        "matchLeft": "___ scarf (روسریِ کیت)",
        "matchRight": "Kate's"
      },
      {
        "id": "p3_l2_17",
        "lesson": 2,
        "ruleTag": "مالکیت با ’s برای اسم مفرد",
        "sentence": "My father's name is Hamid; he is a nurse.",
        "target": "father's",
        "cloze": "My _____ name is Hamid; he is a nurse.",
        "promptHint": "father",
        "options": [
          "father's",
          "fathers",
          "father",
          "fathers'"
        ],
        "fa": "نام پدرم حمید است؛ او پرستار است.",
        "explainFa": "قاعدهٔ این درس (کتاب ص ۳۶): برای انسانِ مفرد «’s» می‌آید: «my father's name»؛ «fathers» جمع است، نه مالکیت.",
        "chunks": [
          "My",
          "fathers",
          "name is Hamid; he",
          "is a nurse."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "father's",
        "flawedSentence": "My fathers name is Hamid; he is a nurse.",
        "matchLeft": "my ___ name (نامِ پدرم)",
        "matchRight": "father's"
      },
      {
        "id": "p3_l2_18",
        "lesson": 2,
        "ruleTag": "مالکیت با آپاستروف برای اسم جمع",
        "sentence": "All the teachers are in the teachers' office now.",
        "target": "teachers'",
        "cloze": "All the teachers are in the _____ office now.",
        "promptHint": "teacher",
        "options": [
          "teachers'",
          "teachers's",
          "teacher",
          "teachers"
        ],
        "fa": "همهٔ معلم‌ها الان در دفتر معلمان هستند.",
        "explainFa": "قاعدهٔ این درس (کتاب ص ۳۶: «Teachers' office»): اسم جمعی که با s تمام می‌شود فقط آپاستروف می‌گیرد: «teachers' office»؛ «teachers's» نادرست است.",
        "chunks": [
          "All the teachers",
          "are in the",
          "teachers's",
          "office now."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "teachers'",
        "flawedSentence": "All the teachers are in the teachers's office now.",
        "matchLeft": "the ___ office (دفترِ معلمان)",
        "matchRight": "teachers'"
      },
      {
        "id": "p3_l2_19",
        "lesson": 2,
        "ruleTag": "مالکیت با of برای شهر و کشور",
        "sentence": "Tehran is the capital of Iran.",
        "target": "of",
        "cloze": "Tehran is the capital _____ Iran.",
        "promptHint": "of",
        "options": [
          "of",
          "from",
          "in",
          "for"
        ],
        "fa": "تهران پایتخت ایران است.",
        "explainFa": "قاعدهٔ این درس (کتاب ص ۳۶: «the door of the room»): برای چیزها و مکان‌ها نسبت را با «of» نشان می‌دهیم: «the capital of Iran».",
        "chunks": [
          "Tehran is",
          "the capital",
          "from",
          "Iran."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "of",
        "flawedSentence": "Tehran is the capital from Iran.",
        "matchLeft": "the capital ___ Iran",
        "matchRight": "of",
        "noTyping": true
      },
      {
        "id": "p3_l2_20",
        "lesson": 2,
        "ruleTag": "مالکیت با of برای اشیا",
        "sentence": "The legs of this old chair are broken.",
        "target": "of",
        "cloze": "The legs _____ this old chair are broken.",
        "promptHint": "of",
        "options": [
          "of",
          "from",
          "at",
          "by"
        ],
        "fa": "پایه‌های این صندلی قدیمی شکسته‌اند.",
        "explainFa": "قاعدهٔ این درس (کتاب ص ۳۶: «The legs of the chair»): برای اجزای اشیا «of» می‌آید: «the legs of this old chair».",
        "chunks": [
          "The legs",
          "from",
          "this old chair",
          "are broken."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "of",
        "flawedSentence": "The legs from this old chair are broken.",
        "matchLeft": "the legs ___ the chair",
        "matchRight": "of",
        "noTyping": true
      },
      {
        "id": "p3_l3_6",
        "lesson": 3,
        "ruleTag": "سوم‌شخص مفرد در حال ساده",
        "sentence": "My father goes to work by car every day.",
        "target": "goes",
        "cloze": "My father _____ to work by car every day.",
        "promptHint": "go",
        "options": [
          "goes",
          "go",
          "going",
          "gone"
        ],
        "fa": "پدرم هر روز با ماشین به سر کار می‌رود.",
        "explainFa": "«My father» سوم‌شخص مفرد است، پس فعل «-s» می‌گیرد.",
        "chunks": [
          "My father",
          "go",
          "to work by",
          "car every day."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "goes",
        "flawedSentence": "My father go to work by car every day.",
        "matchLeft": "My father",
        "matchRight": "goes to work by car"
      },
      {
        "id": "p3_l3_7",
        "lesson": 3,
        "ruleTag": "منفی سوم‌شخص با doesn't",
        "sentence": "She doesn't drink coffee at night.",
        "target": "doesn't",
        "cloze": "She _____ drink coffee at night.",
        "promptHint": "do",
        "options": [
          "doesn't",
          "don't",
          "isn't",
          "not"
        ],
        "fa": "او شب‌ها قهوه نمی‌نوشد.",
        "explainFa": "برای سوم‌شخص مفرد منفی از «doesn't» و فعل ساده استفاده می‌کنیم.",
        "chunks": [
          "She",
          "don't",
          "drink coffee",
          "at night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "doesn't",
        "flawedSentence": "She don't drink coffee at night.",
        "matchLeft": "She",
        "matchRight": "doesn't drink coffee",
        "altAnswers": [
          "didn't"
        ]
      },
      {
        "id": "p3_l3_8",
        "lesson": 4,
        "ruleTag": "never قبل از فعل",
        "sentence": "My grandmother never tells us old stories.",
        "target": "never tells",
        "cloze": "My grandmother _____ us old stories.",
        "promptHint": "never",
        "options": [
          "never tells",
          "tells never",
          "never tell",
          "doesn't never tell"
        ],
        "fa": "مادربزرگم هیچ‌وقت برایمان قصه‌های قدیمی تعریف نمی‌کند.",
        "explainFa": "قید «never» قبل از فعل اصلی می‌آید و فعل سوم‌شخص «s» می‌گیرد: «never tells». «never» خودش منفی است و با «doesn't» نمی‌آید.",
        "chunks": [
          "My grandmother",
          "tells never",
          "us old",
          "stories."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "never tells",
        "flawedSentence": "My grandmother tells never us old stories.",
        "matchLeft": "My grandmother",
        "matchRight": "never tells us old stories"
      },
      {
        "id": "p3_l3_9",
        "lesson": 3,
        "ruleTag": "فعل ساده با they",
        "sentence": "They play football every Friday afternoon.",
        "target": "play",
        "cloze": "They _____ football every Friday afternoon.",
        "promptHint": "play (شکل درست)",
        "options": [
          "play",
          "plays",
          "playing",
          "are play"
        ],
        "fa": "آن‌ها هر جمعه عصر فوتبال بازی می‌کنند.",
        "explainFa": "«They» جمع است و فعل ساده می‌ماند.",
        "chunks": [
          "They",
          "plays",
          "football every",
          "Friday afternoon."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "play",
        "flawedSentence": "They plays football every Friday afternoon.",
        "matchLeft": "They",
        "matchRight": "play football every Friday",
        "altAnswers": [
          "played"
        ]
      },
      {
        "id": "p3_l3_10",
        "lesson": 3,
        "ruleTag": "فعل ساده بعد از Does",
        "sentence": "Does your brother play the piano?",
        "target": "play",
        "cloze": "Does your brother _____ the piano?",
        "promptHint": "play (شکل درست)",
        "options": [
          "play",
          "plays",
          "playing",
          "to play"
        ],
        "fa": "آیا برادرت پیانو می‌زند؟",
        "explainFa": "بعد از «Does» فعل به شکل ساده می‌آید.",
        "chunks": [
          "Does your",
          "brother",
          "plays",
          "the piano?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "play",
        "flawedSentence": "Does your brother plays the piano?",
        "matchLeft": "Does your brother",
        "matchRight": "play the piano"
      },
      {
        "id": "p3_l3_11",
        "lesson": 3,
        "ruleTag": "فعل do با فاعل جمع",
        "sentence": "Most students do their homework carefully.",
        "target": "do",
        "cloze": "Most students _____ their homework carefully.",
        "promptHint": "do (شکل درست)",
        "options": [
          "do",
          "does",
          "doing",
          "are do"
        ],
        "fa": "بیشتر دانش‌آموزان تکالیفشان را با دقت انجام می‌دهند.",
        "explainFa": "«Most students» جمع است و «do» می‌گیرد.",
        "chunks": [
          "Most students",
          "does",
          "their homework",
          "carefully."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "Most students does their homework carefully.",
        "matchLeft": "Most students",
        "matchRight": "do their homework carefully",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p3_l3_12",
        "lesson": 3,
        "ruleTag": "قید تکرار با فعل سوم‌شخص",
        "sentence": "He usually goes to school by bus.",
        "target": "goes",
        "cloze": "He usually _____ to school by bus.",
        "promptHint": "go",
        "options": [
          "goes",
          "go",
          "going",
          "to go"
        ],
        "fa": "او معمولاً با اتوبوس به مدرسه می‌رود.",
        "explainFa": "قید «usually» قبل از فعل اصلی و «-s» سوم‌شخص می‌آید.",
        "chunks": [
          "He usually",
          "go",
          "to school",
          "by bus."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "goes",
        "flawedSentence": "He usually go to school by bus.",
        "matchLeft": "He usually",
        "matchRight": "goes to school by bus",
        "altAnswers": [
          "went"
        ]
      },
      {
        "id": "p3_l3_13",
        "lesson": 3,
        "ruleTag": "منفی با don't",
        "sentence": "They don't come to school on Fridays.",
        "target": "don't",
        "cloze": "They _____ come to school on Fridays.",
        "promptHint": "do",
        "options": [
          "don't",
          "doesn't",
          "not",
          "aren't"
        ],
        "fa": "آن‌ها جمعه‌ها به مدرسه نمی‌آیند.",
        "explainFa": "با «they» از «don't» استفاده می‌کنیم.",
        "chunks": [
          "They",
          "doesn't",
          "come to school",
          "on Fridays."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "don't",
        "flawedSentence": "They doesn't come to school on Fridays.",
        "matchLeft": "They",
        "matchRight": "don't come to school",
        "altAnswers": [
          "didn't"
        ]
      },
      {
        "id": "p3_l3_14",
        "lesson": 4,
        "ruleTag": "جایگاه always",
        "sentence": "My mother always buys fresh bread from the bakery.",
        "target": "always buys",
        "cloze": "My mother _____ fresh bread from the bakery.",
        "promptHint": "always",
        "options": [
          "always buys",
          "buys always",
          "always buy",
          "is always buy"
        ],
        "fa": "مادرم همیشه از نانوایی نان تازه می‌خرد.",
        "explainFa": "قید «always» قبل از فعل اصلی می‌آید: «always buys»؛ فعل سوم‌شخص مفرد «s» می‌گیرد.",
        "chunks": [
          "My mother",
          "buys always",
          "fresh bread from",
          "the bakery."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "always buys",
        "flawedSentence": "My mother buys always fresh bread from the bakery.",
        "matchLeft": "My mother",
        "matchRight": "always buys fresh bread"
      },
      {
        "id": "p3_l3_15",
        "lesson": 4,
        "ruleTag": "پرسش How often با do",
        "sentence": "How often do you visit your grandmother?",
        "target": "do",
        "cloze": "How often _____ you visit your grandmother?",
        "promptHint": "do (شکل درست)",
        "options": [
          "do",
          "does",
          "are",
          "is"
        ],
        "fa": "هر چند وقت یک‌بار به مادربزرگت سر می‌زنی؟",
        "explainFa": "با ضمیر «you» از «do» استفاده می‌کنیم.",
        "chunks": [
          "How often",
          "does",
          "you visit",
          "your grandmother?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "How often does you visit your grandmother?",
        "matchLeft": "How often",
        "matchRight": "do you visit your grandmother",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p3_l4_6",
        "lesson": 4,
        "ruleTag": "پرسش Where با does",
        "sentence": "Where does your father work now?",
        "target": "does",
        "cloze": "Where _____ your father work now?",
        "promptHint": "do",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "پدرت الان کجا کار می‌کند؟",
        "explainFa": "«your father» سوم‌شخص مفرد است، پس «does» می‌گیرد.",
        "chunks": [
          "Where",
          "do",
          "your father",
          "work now?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "Where do your father work now?",
        "matchLeft": "Where",
        "matchRight": "does your father work"
      },
      {
        "id": "p3_l4_7",
        "lesson": 4,
        "ruleTag": "امری منفی با Don't و فعل ساده",
        "sentence": "Don't touch the hot pan with your hand!",
        "target": "Don't",
        "cloze": "_____ touch the hot pan with your hand!",
        "promptHint": "don't",
        "options": [
          "Don't",
          "Doesn't",
          "Not",
          "Do not to"
        ],
        "fa": "با دستت به تابهٔ داغ دست نزن!",
        "explainFa": "در دستور منفی این جمله از «Don’t + فعل ساده» استفاده می‌کنیم، نه «Doesn’t».",
        "chunks": [
          "Doesn't",
          "touch the",
          "hot pan",
          "with your",
          "hand!"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Don't",
        "flawedSentence": "Doesn't touch the hot pan with your hand!",
        "matchLeft": "Don't",
        "matchRight": "touch the hot pan",
        "noTyping": true
      },
      {
        "id": "p3_l4_8",
        "lesson": 4,
        "ruleTag": "امری مثبت با فعل ساده",
        "sentence": "Please open the window in the classroom.",
        "target": "open",
        "cloze": "Please _____ the window in the classroom.",
        "promptHint": "open (شکل درست)",
        "options": [
          "open",
          "opens",
          "opening",
          "opened"
        ],
        "fa": "لطفاً پنجرهٔ کلاس را باز کن.",
        "explainFa": "در جملهٔ امری فعل به شکل ساده مانند «open» و بدون فاعل می‌آید.",
        "chunks": [
          "Please",
          "opens",
          "the window in",
          "the classroom."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "open",
        "flawedSentence": "Please opens the window in the classroom.",
        "matchLeft": "Please",
        "matchRight": "open the window"
      },
      {
        "id": "p3_l4_9",
        "lesson": 4,
        "ruleTag": "پرسش When با does",
        "sentence": "When does the train to Tehran leave?",
        "target": "does",
        "cloze": "When _____ the train to Tehran leave?",
        "promptHint": "do",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "قطار به تهران کی حرکت می‌کند؟",
        "explainFa": "«the train» سوم‌شخص مفرد است، پس «does» می‌گیرد.",
        "chunks": [
          "When",
          "do",
          "the train to",
          "Tehran leave?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "When do the train to Tehran leave?",
        "matchLeft": "When",
        "matchRight": "does the train to Tehran leave",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p3_l4_10",
        "lesson": 4,
        "ruleTag": "پرسش What time با does",
        "sentence": "What time does the library close on Fridays?",
        "target": "does",
        "cloze": "What time _____ the library close on Fridays?",
        "promptHint": "do",
        "options": [
          "does",
          "do",
          "is",
          "are"
        ],
        "fa": "کتابخانه جمعه‌ها ساعت چند بسته می‌شود؟",
        "explainFa": "«the library» مفرد است، پس «does» می‌گیرد؛ «is close» یعنی «نزدیک است» و برای پرسیدن ساعت غلط است.",
        "chunks": [
          "What time",
          "do",
          "the library close",
          "on Fridays?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "does",
        "flawedSentence": "What time do the library close on Fridays?",
        "matchLeft": "What time",
        "matchRight": "does the library close",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p3_l4_11",
        "lesson": 4,
        "ruleTag": "پرسش Who با is",
        "sentence": "Who is the best student in your class?",
        "target": "is",
        "cloze": "Who _____ the best student in your class?",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "does",
          "be"
        ],
        "fa": "بهترین دانش‌آموز کلاس شما کیست؟",
        "explainFa": "در پرسش فاعلی «Who» فعل «be» می‌آید، نه «do/does».",
        "chunks": [
          "Who",
          "are",
          "the best student",
          "in your class?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "Who are the best student in your class?",
        "matchLeft": "Who",
        "matchRight": "is the best student",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "p3_l4_12",
        "lesson": 4,
        "ruleTag": "امری منفی با Don't و be",
        "sentence": "Don't be late for the English class again!",
        "target": "Don't",
        "cloze": "_____ be late for the English class again!",
        "promptHint": "don't",
        "options": [
          "Don't",
          "Doesn't",
          "Not",
          "Aren't"
        ],
        "fa": "دیگر برای کلاس انگلیسی دیر نکن!",
        "explainFa": "در امری منفی خطاب به «you» از «Don't» استفاده می‌کنیم.",
        "chunks": [
          "Doesn't",
          "be late",
          "for the",
          "English class",
          "again!"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Don't",
        "flawedSentence": "Doesn't be late for the English class again!",
        "matchLeft": "Don't",
        "matchRight": "be late for the English class",
        "noTyping": true
      },
      {
        "id": "p3_l4_13",
        "lesson": 4,
        "ruleTag": "گذشته با How many",
        "sentence": "How many students passed the exam last year?",
        "target": "passed",
        "cloze": "How many students _____ the exam last year?",
        "promptHint": "pass",
        "options": [
          "passed",
          "pass",
          "passes",
          "passing"
        ],
        "fa": "چند دانش‌آموز سال گذشته در امتحان قبول شدند؟",
        "explainFa": "«How many students» جمع است، پس فعل گذشته «-ed» می‌گیرد.",
        "chunks": [
          "How many students",
          "pass",
          "the exam",
          "last year?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "passed",
        "flawedSentence": "How many students pass the exam last year?",
        "matchLeft": "How many students",
        "matchRight": "passed the exam"
      },
      {
        "id": "p3_l4_14",
        "lesson": 4,
        "ruleTag": "پرسش Why با do",
        "sentence": "Why do you always come late to school?",
        "target": "do",
        "cloze": "Why _____ you always come late to school?",
        "promptHint": "do (شکل درست)",
        "options": [
          "do",
          "does",
          "are",
          "is"
        ],
        "fa": "چرا همیشه دیر به مدرسه می‌آیی؟",
        "explainFa": "با ضمیر «you» فعل کمکی «do» به‌کار می‌رود.",
        "chunks": [
          "Why",
          "does",
          "you always come",
          "late to school?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "do",
        "flawedSentence": "Why does you always come late to school?",
        "matchLeft": "Why",
        "matchRight": "do you always come late",
        "altAnswers": [
          "did"
        ]
      },
      {
        "id": "p3_l4_15",
        "lesson": 4,
        "ruleTag": "امری منفی دربارهٔ چتر",
        "sentence": "Don't forget your umbrella when it rains!",
        "target": "Don't",
        "cloze": "_____ forget your umbrella when it rains!",
        "promptHint": "don't",
        "options": [
          "Don't",
          "Doesn't",
          "Not",
          "No"
        ],
        "fa": "وقتی باران می‌بارد چترت را جا نگذار!",
        "explainFa": "جملهٔ امری منفی با «Don't» و فعل ساده ساخته می‌شود.",
        "chunks": [
          "Doesn't",
          "forget your",
          "umbrella when",
          "it",
          "rains!"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Don't",
        "flawedSentence": "Doesn't forget your umbrella when it rains!",
        "matchLeft": "Don't",
        "matchRight": "forget your umbrella",
        "noTyping": true
      },
      {
        "id": "p3_l5_6",
        "lesson": 5,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ خریدن",
        "sentence": "Last week we bought a new computer for the lab.",
        "target": "bought",
        "cloze": "Last week we _____ a new computer for the lab.",
        "promptHint": "buy",
        "options": [
          "bought",
          "buyed",
          "buy",
          "buys"
        ],
        "fa": "هفتهٔ گذشته یک رایانهٔ جدید برای آزمایشگاه خریدیم.",
        "explainFa": "«buy» فعل بی‌قاعده است و گذشتهٔ آن «bought» می‌شود.",
        "chunks": [
          "Last week we",
          "buyed",
          "a new computer",
          "for the lab."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "bought",
        "flawedSentence": "Last week we buyed a new computer for the lab.",
        "matchLeft": "Last week we",
        "matchRight": "bought a new computer"
      },
      {
        "id": "p3_l5_7",
        "lesson": 5,
        "ruleTag": "گذشتهٔ باقاعده با ed",
        "sentence": "She passed the exam last Monday.",
        "target": "passed",
        "cloze": "She _____ the exam last Monday.",
        "promptHint": "pass",
        "options": [
          "passed",
          "pass",
          "passes",
          "passing"
        ],
        "fa": "او دوشنبهٔ گذشته در امتحان قبول شد.",
        "explainFa": "فعل «pass» با افزودن «-ed» گذشته می‌شود.",
        "chunks": [
          "She",
          "pass",
          "the exam",
          "last Monday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "passed",
        "flawedSentence": "She pass the exam last Monday.",
        "matchLeft": "She",
        "matchRight": "passed the exam"
      },
      {
        "id": "p3_l5_8",
        "lesson": 5,
        "ruleTag": "فعل ساده بعد از Did",
        "sentence": "Did you finish your homework yesterday?",
        "target": "finish",
        "cloze": "Did you _____ your homework yesterday?",
        "promptHint": "finish (شکل درست)",
        "options": [
          "finish",
          "finished",
          "finishes",
          "finishing"
        ],
        "fa": "آیا دیروز تکالیفت را تمام کردی؟",
        "explainFa": "بعد از «Did» فعل به شکل ساده می‌آید.",
        "chunks": [
          "Did you",
          "finished",
          "your homework",
          "yesterday?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "finish",
        "flawedSentence": "Did you finished your homework yesterday?",
        "matchLeft": "Did you",
        "matchRight": "finish your homework"
      },
      {
        "id": "p3_l5_9",
        "lesson": 5,
        "ruleTag": "گذشتهٔ باقاعدهٔ کارگران",
        "sentence": "The workers cleaned the road last month.",
        "target": "cleaned",
        "cloze": "The workers _____ the road last month.",
        "promptHint": "clean",
        "options": [
          "cleaned",
          "clean",
          "cleans",
          "cleaning"
        ],
        "fa": "کارگران ماه گذشته جاده را تمیز کردند.",
        "explainFa": "فعل باقاعده با «-ed» گذشته می‌شود.",
        "chunks": [
          "The workers",
          "clean",
          "the road",
          "last month."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "cleaned",
        "flawedSentence": "The workers clean the road last month.",
        "matchLeft": "The workers",
        "matchRight": "cleaned the road"
      },
      {
        "id": "p3_l5_10",
        "lesson": 5,
        "ruleTag": "گذشتهٔ watched",
        "sentence": "We watched that film last Friday.",
        "target": "watched",
        "cloze": "We _____ that film last Friday.",
        "promptHint": "watch",
        "options": [
          "watched",
          "watch",
          "watchs",
          "watching"
        ],
        "fa": "ما پنجشنبهٔ گذشته آن فیلم را دیدیم.",
        "explainFa": "«watched» شکل گذشتهٔ «watch» است.",
        "chunks": [
          "We",
          "watch",
          "that film",
          "last Friday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "watched",
        "flawedSentence": "We watch that film last Friday.",
        "matchLeft": "We",
        "matchRight": "watched that film"
      },
      {
        "id": "p3_l5_11",
        "lesson": 5,
        "ruleTag": "پرسش گذشته با Did",
        "sentence": "Did you visit your uncle yesterday?",
        "target": "Did",
        "cloze": "_____ you visit your uncle yesterday?",
        "promptHint": "do (شکل درست)",
        "options": [
          "Did",
          "Do",
          "Does",
          "Are"
        ],
        "fa": "آیا دیروز عمویت را دیدی؟",
        "explainFa": "برای پرسیدن دربارهٔ گذشته از «Did» استفاده می‌کنیم.",
        "chunks": [
          "Do",
          "you visit",
          "your",
          "uncle",
          "yesterday?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Did",
        "flawedSentence": "Do you visit your uncle yesterday?",
        "matchLeft": "Did",
        "matchRight": "you visit your uncle"
      },
      {
        "id": "p3_l5_12",
        "lesson": 5,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ break",
        "sentence": "My little brother broke his toy car last night.",
        "target": "broke",
        "cloze": "My little brother _____ his toy car last night.",
        "promptHint": "break",
        "options": [
          "broke",
          "breaked",
          "break",
          "breaks"
        ],
        "fa": "برادر کوچکم دیشب ماشین اسباب‌بازی‌اش را شکست.",
        "explainFa": "«break» در گذشته «broke» می‌شود.",
        "chunks": [
          "My little brother",
          "breaked",
          "his toy car",
          "last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "broke",
        "flawedSentence": "My little brother breaked his toy car last night.",
        "matchLeft": "My little brother",
        "matchRight": "broke his toy car"
      },
      {
        "id": "p3_l5_13",
        "lesson": 5,
        "ruleTag": "گذشتهٔ to be با was",
        "sentence": "The weather was very cold yesterday morning.",
        "target": "was",
        "cloze": "The weather _____ very cold yesterday morning.",
        "promptHint": "be",
        "options": [
          "was",
          "were",
          "is",
          "are"
        ],
        "fa": "هوا دیروز صبح خیلی سرد بود.",
        "explainFa": "«The weather» مفرد است، پس گذشتهٔ «to be» می‌شود «was».",
        "chunks": [
          "The weather",
          "were",
          "very cold",
          "yesterday morning."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "was",
        "flawedSentence": "The weather were very cold yesterday morning.",
        "matchLeft": "The weather",
        "matchRight": "was very cold"
      },
      {
        "id": "p3_l5_14",
        "lesson": 5,
        "ruleTag": "گذشتهٔ to be با were",
        "sentence": "They were at home all day yesterday.",
        "target": "were",
        "cloze": "They _____ at home all day yesterday.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "are",
          "is"
        ],
        "fa": "آن‌ها دیروز تمام روز در خانه بودند.",
        "explainFa": "«They» جمع است، پس «were» می‌آید.",
        "chunks": [
          "They",
          "was",
          "at home all",
          "day yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "They was at home all day yesterday.",
        "matchLeft": "They",
        "matchRight": "were at home all day"
      },
      {
        "id": "p3_l5_15",
        "lesson": 5,
        "ruleTag": "گذشتهٔ منفی با didn't",
        "sentence": "She didn't call her grandmother last night.",
        "target": "didn't call",
        "cloze": "She _____ her grandmother last night.",
        "promptHint": "do",
        "options": [
          "didn't call",
          "didn't called",
          "doesn't call",
          "not called"
        ],
        "fa": "او دیشب به مادربزرگش زنگ نزد.",
        "explainFa": "بعد از «didn't» فعل به شکل ساده می‌آید.",
        "chunks": [
          "She",
          "didn't called",
          "her grandmother",
          "last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "didn't call",
        "flawedSentence": "She didn't called her grandmother last night.",
        "matchLeft": "She",
        "matchRight": "didn't call her grandmother"
      },
      {
        "id": "p3_l5_16",
        "lesson": 5,
        "ruleTag": "گذشتهٔ to be با you (were)",
        "sentence": "You were very happy at the party yesterday.",
        "target": "were",
        "cloze": "You _____ very happy at the party yesterday.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "are",
          "is"
        ],
        "fa": "تو دیروز در مهمانی خیلی خوشحال بودی.",
        "explainFa": "کتاب (ص ۸۸: «You were happy yesterday»): گذشتهٔ to be برای «you» همیشه «were» است، حتی وقتی منظور یک نفر باشد.",
        "chunks": [
          "You",
          "was",
          "very happy at",
          "the party yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "You was very happy at the party yesterday.",
        "matchLeft": "You ___ happy yesterday",
        "matchRight": "were"
      },
      {
        "id": "p3_l5_17",
        "lesson": 5,
        "ruleTag": "وجود: There was با اسم مفرد",
        "sentence": "There was an interesting article in the newspaper yesterday.",
        "target": "was",
        "cloze": "There _____ an interesting article in the newspaper yesterday.",
        "promptHint": "be",
        "options": [
          "was",
          "were",
          "is",
          "are"
        ],
        "fa": "دیروز یک مقالهٔ جالب در روزنامه بود.",
        "explainFa": "کتاب (ص ۸۸: «There was a newspaper in the library»): «There was» + اسم مفرد (an interesting article)؛ «were» برای اسم جمع است.",
        "chunks": [
          "There",
          "were",
          "an interesting article in",
          "the newspaper yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "was",
        "flawedSentence": "There were an interesting article in the newspaper yesterday.",
        "matchLeft": "There ___ an article (دیروز)",
        "matchRight": "was"
      },
      {
        "id": "p3_l5_18",
        "lesson": 5,
        "ruleTag": "وجود: There were با اسم جمع",
        "sentence": "There were many messages in my mailbox last night.",
        "target": "were",
        "cloze": "There _____ many messages in my mailbox last night.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "are",
          "is"
        ],
        "fa": "دیشب پیام‌های زیادی در صندوق پیامم بود.",
        "explainFa": "کتاب (ص ۸۸: «There were many messages in my mailbox»): «There were» + اسم جمع (many messages).",
        "chunks": [
          "There",
          "was",
          "many messages in my",
          "mailbox last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "There was many messages in my mailbox last night.",
        "matchLeft": "There ___ messages (دیشب)",
        "matchRight": "were"
      },
      {
        "id": "p3_l5_19",
        "lesson": 5,
        "ruleTag": "گذشتهٔ منفی to be با I (wasn't)",
        "sentence": "I wasn't at school yesterday because I was ill.",
        "target": "wasn't",
        "cloze": "I _____ at school yesterday because I was ill.",
        "promptHint": "be",
        "options": [
          "wasn't",
          "didn't",
          "weren't",
          "isn't"
        ],
        "fa": "دیروز مدرسه نبودم چون بیمار بودم.",
        "explainFa": "کتاب (ص ۸۸: «I was not / wasn't happy»): منفیِ گذشتهٔ to be با «I» ← «wasn't»؛ «didn't» فقط با فعل اصلی می‌آید.",
        "chunks": [
          "I",
          "didn't",
          "at school yesterday because",
          "I was ill."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wasn't",
        "flawedSentence": "I didn't at school yesterday because I was ill.",
        "matchLeft": "I ___ at school (دیروز، منفی)",
        "matchRight": "wasn't"
      },
      {
        "id": "p3_l5_20",
        "lesson": 5,
        "ruleTag": "گذشتهٔ پرسشی to be با Were",
        "sentence": "Were your parents at home last night?",
        "target": "Were",
        "cloze": "_____ your parents at home last night?",
        "promptHint": "be",
        "options": [
          "Were",
          "Did",
          "Are",
          "Was"
        ],
        "fa": "آیا پدر و مادرت دیشب خانه بودند؟",
        "explainFa": "پرسش گذشتهٔ to be با فاعل جمع (your parents) ← «Were …?»؛ «Did» فقط با فعل اصلی می‌آید (کتاب ص ۸۸).",
        "chunks": [
          "Did",
          "your parents",
          "at home",
          "last",
          "night?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Were",
        "flawedSentence": "Did your parents at home last night?",
        "matchLeft": "___ your parents at home (دیشب)?",
        "matchRight": "Were"
      },
      {
        "id": "p3_l6_6",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ cut",
        "sentence": "She cut her finger while cooking dinner last night.",
        "target": "cut",
        "cloze": "She _____ her finger while cooking dinner last night.",
        "promptHint": "cut (شکل درست)",
        "options": [
          "cut",
          "cuted",
          "cuts",
          "cutting"
        ],
        "fa": "او دیشب هنگام آشپزی انگشتش را برید.",
        "explainFa": "«cut» در گذشته شکل ظاهری‌اش را نگه می‌دارد و «-ed» نمی‌گیرد.",
        "chunks": [
          "She",
          "cuted",
          "her finger while cooking",
          "dinner last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "cut",
        "flawedSentence": "She cuted her finger while cooking dinner last night.",
        "matchLeft": "She",
        "matchRight": "cut her finger"
      },
      {
        "id": "p3_l6_7",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ put",
        "sentence": "He put his keys on the shelf an hour ago.",
        "target": "put",
        "cloze": "He _____ his keys on the shelf an hour ago.",
        "promptHint": "put (شکل درست)",
        "options": [
          "put",
          "putted",
          "puts",
          "putting"
        ],
        "fa": "او یک ساعت پیش کلیدهایش را روی قفسه گذاشت.",
        "explainFa": "«put» گذشته‌اش تغییری نمی‌کند.",
        "chunks": [
          "He",
          "putted",
          "his keys on the",
          "shelf an hour ago."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "put",
        "flawedSentence": "He putted his keys on the shelf an hour ago.",
        "matchLeft": "He",
        "matchRight": "put his keys on the shelf"
      },
      {
        "id": "p3_l6_8",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ flew",
        "sentence": "We flew to Tehran by plane last summer.",
        "target": "flew",
        "cloze": "We _____ to Tehran by plane last summer.",
        "promptHint": "fly",
        "options": [
          "flew",
          "flyed",
          "fly",
          "flies"
        ],
        "fa": "ما تابستان گذشته با هواپیما به تهران رفتیم.",
        "explainFa": "«fly» در گذشته «flew» می‌شود.",
        "chunks": [
          "We",
          "flyed",
          "to Tehran by",
          "plane last summer."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "flew",
        "flawedSentence": "We flyed to Tehran by plane last summer.",
        "matchLeft": "We",
        "matchRight": "flew to Tehran by plane"
      },
      {
        "id": "p3_l6_9",
        "lesson": 6,
        "ruleTag": "گذشتهٔ خریدن bought",
        "sentence": "My father bought a new car last month.",
        "target": "bought",
        "cloze": "My father _____ a new car last month.",
        "promptHint": "buy",
        "options": [
          "bought",
          "buyed",
          "buy",
          "buys"
        ],
        "fa": "پدرم ماه گذشته یک ماشین جدید خرید.",
        "explainFa": "«buy» گذشته‌اش «bought» است.",
        "chunks": [
          "My father",
          "buyed",
          "a new car",
          "last month."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "bought",
        "flawedSentence": "My father buyed a new car last month.",
        "matchLeft": "My father",
        "matchRight": "bought a new car"
      },
      {
        "id": "p3_l6_10",
        "lesson": 6,
        "ruleTag": "گذشتهٔ باقاعدهٔ بازی",
        "sentence": "They played football on their new field yesterday.",
        "target": "played",
        "cloze": "They _____ football on their new field yesterday.",
        "promptHint": "play",
        "options": [
          "played",
          "play",
          "plays",
          "playes"
        ],
        "fa": "آن‌ها دیروز در زمین جدیدشان فوتبال بازی کردند.",
        "explainFa": "در گذشته فعل باقاعده «-ed» می‌گیرد.",
        "chunks": [
          "They",
          "play",
          "football on their",
          "new field yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "played",
        "flawedSentence": "They play football on their new field yesterday.",
        "matchLeft": "They",
        "matchRight": "played football yesterday"
      },
      {
        "id": "p3_l6_11",
        "lesson": 6,
        "ruleTag": "گذشتهٔ منفی با didn't و فعل ساده",
        "sentence": "I didn't finish my homework before dinner yesterday.",
        "target": "didn't finish",
        "cloze": "I _____ my homework before dinner yesterday.",
        "promptHint": "do",
        "options": [
          "didn't finish",
          "didn't finished",
          "don't finish",
          "didn't"
        ],
        "fa": "دیروز تکالیفم را قبل از شام تمام نکردم.",
        "explainFa": "بعد از «didn't» فعل به شکل ساده می‌آید.",
        "chunks": [
          "I",
          "didn't finished",
          "my homework before",
          "dinner yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "didn't finish",
        "flawedSentence": "I didn't finished my homework before dinner yesterday.",
        "matchLeft": "I",
        "matchRight": "didn't finish my homework"
      },
      {
        "id": "p3_l6_12",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ wrote",
        "sentence": "The teacher wrote the answers on the board yesterday.",
        "target": "wrote",
        "cloze": "The teacher _____ the answers on the board yesterday.",
        "promptHint": "write",
        "options": [
          "wrote",
          "writed",
          "write",
          "writes"
        ],
        "fa": "معلم دیروز جواب‌ها را روی تخته نوشت.",
        "explainFa": "«write» گذشته‌اش «wrote» است.",
        "chunks": [
          "The teacher",
          "writed",
          "the answers on",
          "the board yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wrote",
        "flawedSentence": "The teacher writed the answers on the board yesterday.",
        "matchLeft": "The teacher",
        "matchRight": "wrote the answers"
      },
      {
        "id": "p3_l6_13",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ found",
        "sentence": "She found her lost keys in the bag this morning.",
        "target": "found",
        "cloze": "She _____ her lost keys in the bag this morning.",
        "promptHint": "find",
        "options": [
          "found",
          "finded",
          "find",
          "finds"
        ],
        "fa": "او امروز صبح کلیدهای گمشده‌اش را در کیف پیدا کرد.",
        "explainFa": "«find» گذشته‌اش «found» است.",
        "chunks": [
          "She",
          "finded",
          "her lost keys in",
          "the bag this morning."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "found",
        "flawedSentence": "She finded her lost keys in the bag this morning.",
        "matchLeft": "She",
        "matchRight": "found her lost keys"
      },
      {
        "id": "p3_l6_14",
        "lesson": 6,
        "ruleTag": "پرسش گذشته با did و فعل ساده",
        "sentence": "How did the fire start last night?",
        "target": "start",
        "cloze": "How did the fire _____ last night?",
        "promptHint": "start (شکل درست)",
        "options": [
          "start",
          "startted",
          "started",
          "starts"
        ],
        "fa": "آتش دیشب چگونه شروع شد؟",
        "explainFa": "بعد از «did» فعل به شکل ساده می‌آید.",
        "chunks": [
          "How did",
          "the fire",
          "startted",
          "last night?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "start",
        "flawedSentence": "How did the fire startted last night?",
        "matchLeft": "How did the fire",
        "matchRight": "start last night"
      },
      {
        "id": "p3_l6_15",
        "lesson": 6,
        "ruleTag": "گذشتهٔ بی‌قاعدهٔ ate",
        "sentence": "My little sister ate the whole cake yesterday.",
        "target": "ate",
        "cloze": "My little sister _____ the whole cake yesterday.",
        "promptHint": "eat",
        "options": [
          "ate",
          "eated",
          "eat",
          "eats"
        ],
        "fa": "خواهر کوچکم دیروز کل کیک را خورد.",
        "explainFa": "«eat» گذشته‌اش «ate» است.",
        "chunks": [
          "My little sister",
          "eated",
          "the whole",
          "cake yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "ate",
        "flawedSentence": "My little sister eated the whole cake yesterday.",
        "matchLeft": "My little sister",
        "matchRight": "ate the whole cake"
      },
      {
        "id": "p3_l6_16",
        "lesson": 6,
        "ruleTag": "ضمیر مفعولی her",
        "sentence": "Mina looked at Zahra and smiled at her kindly.",
        "target": "her",
        "cloze": "Mina looked at Zahra and smiled at _____ kindly.",
        "promptHint": "she",
        "options": [
          "her",
          "she",
          "hers",
          "his"
        ],
        "fa": "مینا به زهرا نگاه کرد و با مهربانی به او لبخند زد.",
        "explainFa": "کتاب (ص ۱۰۲: «Mina looked at Zahra / her»): در جایگاه مفعول ضمیر مفعولی می‌آید: «she» ← «her».",
        "chunks": [
          "Mina looked at Zahra",
          "and smiled at",
          "she",
          "kindly."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "her",
        "flawedSentence": "Mina looked at Zahra and smiled at she kindly.",
        "matchLeft": "smiled at ___ (زهرا)",
        "matchRight": "her"
      },
      {
        "id": "p3_l6_17",
        "lesson": 6,
        "ruleTag": "ضمیر مفعولی him",
        "sentence": "They saw Ali in the park and talked to him for an hour.",
        "target": "him",
        "cloze": "They saw Ali in the park and talked to _____ for an hour.",
        "promptHint": "he",
        "options": [
          "him",
          "he",
          "his",
          "himself"
        ],
        "fa": "آن‌ها علی را در پارک دیدند و یک ساعت با او حرف زدند.",
        "explainFa": "کتاب (ص ۱۰۲: «They saw Ali / him in the park»): «he» در جایگاه مفعول ← «him».",
        "chunks": [
          "They saw Ali in the",
          "park and talked to",
          "he",
          "for an hour."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "him",
        "flawedSentence": "They saw Ali in the park and talked to he for an hour.",
        "matchLeft": "talked to ___ (علی)",
        "matchRight": "him"
      },
      {
        "id": "p3_l6_18",
        "lesson": 6,
        "ruleTag": "ضمیر مفعولی us",
        "sentence": "My grandparents invited us to dinner last Friday.",
        "target": "us",
        "cloze": "My grandparents invited _____ to dinner last Friday.",
        "promptHint": "we",
        "options": [
          "us",
          "we",
          "our",
          "ours"
        ],
        "fa": "پدربزرگ و مادربزرگم جمعهٔ گذشته ما را به شام دعوت کردند.",
        "explainFa": "کتاب (ص ۱۰۲: «They invited us»): مفعولِ فعل «invited» ضمیر مفعولی است: «we» ← «us».",
        "chunks": [
          "My grandparents invited",
          "we",
          "to dinner",
          "last Friday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "us",
        "flawedSentence": "My grandparents invited we to dinner last Friday.",
        "matchLeft": "invited ___ (ما را)",
        "matchRight": "us"
      },
      {
        "id": "p3_l6_19",
        "lesson": 6,
        "ruleTag": "ضمیر مفعولی them",
        "sentence": "I bought two new books and read them in one week.",
        "target": "them",
        "cloze": "I bought two new books and read _____ in one week.",
        "promptHint": "they",
        "options": [
          "them",
          "they",
          "their",
          "theirs"
        ],
        "fa": "دو کتاب تازه خریدم و آن‌ها را در یک هفته خواندم.",
        "explainFa": "کتاب (ص ۱۰۲: «She read the books / them»): برای مفعولِ جمع «them» می‌آید، نه «they».",
        "chunks": [
          "I bought two new",
          "books and read",
          "they",
          "in one week."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "them",
        "flawedSentence": "I bought two new books and read they in one week.",
        "matchLeft": "read ___ (کتاب‌ها را)",
        "matchRight": "them"
      },
      {
        "id": "p3_l6_20",
        "lesson": 6,
        "ruleTag": "ضمیر مفعولی it",
        "sentence": "The cat is hungry. Please give it some milk.",
        "target": "it",
        "cloze": "The cat is hungry. Please give _____ some milk.",
        "promptHint": "it",
        "options": [
          "it",
          "its",
          "it's",
          "itself"
        ],
        "fa": "گربه گرسنه است. لطفاً به آن کمی شیر بده.",
        "explainFa": "کتاب (ص ۱۰۲: «You hurt the cat / it»): ضمیر مفعولیِ «it» همان «it» است؛ «its» صفت ملکی است و «it's» یعنی «it is».",
        "chunks": [
          "The cat is",
          "hungry. Please give",
          "its",
          "some milk."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "it",
        "flawedSentence": "The cat is hungry. Please give its some milk.",
        "matchLeft": "give ___ some milk (به گربه)",
        "matchRight": "it",
        "noTyping": true
      }
    ],
    "onboarding": {
      "id": "p3_onboard",
      "sentence": "My brother plays football every Friday.",
      "cloze": "My brother _____ football every Friday.",
      "target": "plays",
      "options": [
        "plays",
        "play",
        "playing",
        "is play"
      ],
      "fa": "برادرم هر جمعه فوتبال بازی می‌کند.",
      "explainFa": "با فاعل مفرد («My brother») در حال ساده فعل «s» می‌گیرد: «plays»."
    }
  },
  "vision_1": {
    "id": "vision_1",
    "name": "Vision 1",
    "titleFa": "پایه دهم",
    "modeBadgeFa": "گرامر و ساختار نوشتار (Grammar & Writing)",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: Saving Nature",
        "titleFa": "درس ۱: زمان آینده (will و be going to) + انواع اسم و جمع بی‌قاعده",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "از «will + فعل ساده» برای تصمیم ناگهانی، قول دادن و پیش‌بینی شخصی (با I think / hope / maybe) و از «am/is/are going to + فعل ساده» برای قصد و برنامه از پیش تعیین‌شده یا پیش‌بینی دارای نشانه عینی (مثل ابرهای سیاه) استفاده می‌کنیم. در بخش Writing نیز جمع‌های بی‌قاعده (wolves, mice, children, women, feet) و حروف بزرگ اسامی خاص اهمیت ویژه دارند.",
        "formulas": [
          {
            "label": "تصمیم آنی / قول (will)",
            "chips": [
              {
                "role": "subj",
                "text": "I think"
              },
              {
                "role": "subj",
                "text": "humans"
              },
              {
                "role": "aux",
                "text": "will"
              },
              {
                "role": "verb",
                "text": "save"
              },
              {
                "role": "obj",
                "text": "nature."
              }
            ],
            "exampleEn": "Wait! I will carry that heavy box for you.",
            "exampleFa": "صبر کن! من آن جعبه سنگین را برایت حمل خواهم کرد.",
            "learnerGlossFa": "فکر می‌کنم انسان‌ها طبیعت را نجات خواهند داد."
          },
          {
            "label": "قصد قبلی / شاهد عینی",
            "chips": [
              {
                "role": "subj",
                "text": "Look at the clouds! It"
              },
              {
                "role": "aux",
                "text": "is going to"
              },
              {
                "role": "verb",
                "text": "rain."
              }
            ],
            "exampleEn": "We bought tickets; we are going to visit Shiraz.",
            "exampleFa": "ما بلیت خریده‌ایم؛ قصد داریم از شیراز دیدن کنیم.",
            "learnerGlossFa": "به ابرها نگاه کن! احتمالاً باران می‌بارد."
          }
        ],
        "signals": [
          "tomorrow",
          "soon",
          "in the future",
          "I think / promise → will",
          "Look at ...! / plan → be going to"
        ],
        "traps": [
          {
            "wrong": "Look at those dark clouds! It going to rain.",
            "right": "Look at those dark clouds! It is going to rain.",
            "noteFa": "در ساخت «be going to» وجود «is» لازم است. برای پیش‌بینی بر پایهٔ نشانهٔ حاضر این ساخت رایج است، اما «It will rain» هم لزوماً غلط نیست. نمونهٔ کتاب (ص ۲۹): «Look at the sky! It’s going to rain»."
          },
          {
            "wrong": "Many wolfs live in the forest.",
            "right": "Many wolves live in the forest.",
            "noteFa": "جمع بعضی اسم‌های پایان‌یافته به «f/fe»، مانند «wolf»، «leaf» و «knife»، با «-ves» ساخته می‌شود: «wolves»، «leaves»، «knives». همهٔ اسم‌های این گروه چنین نیستند."
          }
        ],
        "timelineType": "future_plan",
        "timelineCaptionFa": "دو مسیر آینده: تصمیم آنی/پیش‌بینی ذهنی (will) در برابر برنامه قبلی/مدرک عینی (be going to)",
        "contextDialogue": {
          "lineA": "Look at those dark clouds! It is going to rain soon.",
          "faA": "به آن ابرهای تیره نگاه کن! به‌زودی باران خواهد بارید.",
          "lineB": "Oh, really? Wait a second, I will bring an umbrella for you!",
          "faB": "اوه، واقعاً؟ یک لحظه صبر کن، الان برایت چتر می‌آورم!"
        },
        "guidedDiscovery": {
          "questionFa": "در گفت‌وگوی بالا، چرا نفر اول گفت «is going to rain» ولی نفر دوم گفت «will bring»؟",
          "options": [
            "اولی بر پایه شاهد عینی در آسمان (ابرهای تیره) و دومی تصمیم آنی در همان لحظه صحبت است",
            "هر دو کاملاً تصادفی انتخاب شده‌اند",
            "will فقط برای اول‌شخص به کار می‌رود"
          ],
          "correctIdx": 0,
          "insightFa": "فوق‌العاده! مدرک فعلی و قصد قبلی = «be going to»؛ تصمیم ناگهانی، قول و I think/hope = «will». نمونهٔ کتاب (See Also ص ۲۹): «Look at the sky! It's going to rain»"
        },
        "threeD": {
          "formFa": "will / won't + Base Verb | am/is/are + going to + Base Verb | Writing: جمع‌های بی‌قاعده و اسامی خاص",
          "meaningFa": "بیان رخدادهای پیش‌رو در آینده نزدیک یا دور با تفکیک قطعیت و برنامه‌ریزی",
          "useFa": "امتحان دهم: توجه به نشانه‌های مدرک عینی (Look at...) در برابر قول و پیش‌بینی ذهنی + جمع wolves/children/mice"
        },
        "learnerGuide": {
          "explainFa": "برای تصمیمی که همان لحظه می‌گیریم، قول یا بسیاری از پیش‌بینی‌های شخصی، will و فعل ساده به کار می‌رود. برای برنامهٔ قبلی یا پیش‌بینی بر پایهٔ نشانهٔ کنونی، از am، is یا are به‌همراه going to و فعل ساده استفاده می‌کنیم. این کاربردها راهنمای انتخاب‌اند و همهٔ موقعیت‌ها مرز قطعی ندارند.",
          "examples": [
            {
              "en": "I will carry the box.",
              "fa": "من جعبه را حمل می‌کنم."
            },
            {
              "en": "It is going to rain.",
              "fa": "احتمالاً باران می‌بارد."
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: Wonders of Creation",
        "titleFa": "درس ۲: صفات برابری، تفضیلی و عالی + ترتیب صفات قبل از اسم",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "برای برابری، صفت ساده میان دو «as» می‌آید. برای مقایسهٔ دو چیز از صفت تفضیلی همراه «than» و برای برترین عضو گروه از «the» و صفت عالی استفاده می‌کنیم. در کنار نظر، اندازه، سن یا کیفیت، شکل، رنگ، ملیت یا خاستگاه، جنس و کاربرد نیز می‌توانند در ترتیب صفت‌ها نقش داشته باشند؛ این ترتیب راهنمایی کلی است، نه قانونی بی‌استثنا.",
        "formulas": [
          {
            "label": "برابری (as...as)",
            "chips": [
              {
                "role": "subj",
                "text": "Mars is not"
              },
              {
                "role": "aux",
                "text": "as"
              },
              {
                "role": "verb",
                "text": "large"
              },
              {
                "role": "aux",
                "text": "as"
              },
              {
                "role": "obj",
                "text": "Jupiter."
              }
            ],
            "exampleEn": "This river is as deep as that one.",
            "exampleFa": "این رودخانه به اندازهٔ آن یکی عمیق است.",
            "learnerGlossFa": "مریخ به بزرگی مشتری نیست."
          },
          {
            "label": "صفت عالی (the + adjective + -est)",
            "chips": [
              {
                "role": "subj",
                "text": "Jupiter is"
              },
              {
                "role": "aux",
                "text": "the largest"
              },
              {
                "role": "obj",
                "text": "planet"
              },
              {
                "role": "sig",
                "text": "in the solar system."
              }
            ],
            "exampleEn": "She is the tallest student in our class.",
            "exampleFa": "او قدبلندترین دانش‌آموز کلاس ماست.",
            "learnerGlossFa": "مشتری بزرگ‌ترین سیارهٔ منظومهٔ شمسی است."
          }
        ],
        "signals": [
          "as ... as",
          "than → comparative",
          "the ... in/of → superlative",
          "good → better → the best",
          "bad → worse → the worst"
        ],
        "traps": [
          {
            "wrong": "Damavand is more higher than Tochal.",
            "right": "Damavand is higher than Tochal.",
            "noteFa": "هرگز «more» و «-er» را هم‌زمان نیاورید! صفت کوتاه «high» فقط «higher» می‌شود."
          },
          {
            "wrong": "a wooden old round table",
            "right": "an old round wooden table",
            "noteFa": "در این نمونه، «old» پیش از «round» و صفت جنس «wooden» نزدیک‌تر به اسم «table» آمده است؛ ترتیب صفت‌ها یک گرایش است و همیشه قالبی یکسان ندارد."
          }
        ],
        "timelineType": "scale_compare",
        "timelineCaptionFa": "پلکان سهله‌پله صفت: برابری (as...as) ← برتری دو طرف (-er / more) ← برتری مطلق (the -est / most)",
        "contextDialogue": {
          "lineA": "Is Mars as large as Earth?",
          "faA": "آیا مریخ به بزرگی زمین است؟",
          "lineB": "No, Earth is larger than Mars, and Jupiter is the largest planet of all!",
          "faB": "نه، زمین از مریخ بزرگ‌تر است و مشتری بزرگ‌ترین سیاره در میان همه است!"
        },
        "guidedDiscovery": {
          "questionFa": "در عبارت «as large as»، چرا صفت «large» هیچ پسوند -er یا -est نگرفته است؟",
          "options": [
            "چون بین دو واژه as ... as همیشه شکل کاملاً ساده صفت قرار می‌گیرد",
            "چون Mars مفرد است",
            "چون large صفت بی‌قاعده است"
          ],
          "correctIdx": 0,
          "insightFa": "کاملاً درست! بین «as ... as» صفت ساده، قبل از «than» صفت تفضیلی، و بعد از «the» (در یک گروه) صفت عالی می‌آید."
        },
        "threeD": {
          "formFa": "as + Adj + as | Adj-er / more Adj + than | the + Adj-est / most Adj | Writing: ترتیب OSASCOMP",
          "meaningFa": "سنجش شباهت، تفاوت دو پدیده و برترین عضو یک مجموعه علمی یا طبیعی",
          "useFa": "یادآوری صفات بی‌قاعده (good→better→best, bad→worse→worst) و ترتیب صفت پیش از اسم (نظر←اندازه←سن←رنگ←ملیت←جنس)"
        },
        "learnerGuide": {
          "explainFa": "برای برابری، صفت ساده بین دو as قرار می‌گیرد. برای مقایسهٔ دو چیز، صفت کوتاه معمولاً پسوند er و صفت بلند معمولاً more می‌گیرد؛ برای صفت عالی از the و شکل est یا most استفاده می‌کنیم. بعضی شکل‌ها بی‌قاعده‌اند، مانند good، better و best. در چیدن چند صفت، معمولاً نظر پیش از ویژگی‌هایی مانند رنگ و جنس می‌آید؛ این ترتیب یک راهنمای کلی است.",
          "examples": [
            {
              "en": "This tree is taller than that one.",
              "fa": "این درخت از آن یکی بلندتر است."
            },
            {
              "en": "She bought a beautiful old red table.",
              "fa": "او یک میز قرمز قدیمی و زیبا خرید."
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: The Value of Knowledge",
        "titleFa": "درس ۳: گذشته استمراری، ضمایر انعکاسی و افعال حالتی (State Verbs)",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "گذشتهٔ استمراری «was/were + V-ing» کاری را نشان می‌دهد که در زمانی در گذشته در جریان بوده است. گاهی رویداد دیگری آن را قطع می‌کند یا دو کار هم‌زمان رخ می‌دهند. ضمایر انعکاسی مانند «myself» و «themselves» به فاعل برمی‌گردند و گاهی برای تأکید به کار می‌روند. افعال حالتی مانند «know»، «believe»، «need» و «want» در معنای حالتی معمولاً استمراری نمی‌شوند؛ این به معنی ممنوع‌بودن همهٔ شکل‌های «-ing» نیست.",
        "formulas": [
          {
            "label": "تلاقی در گذشته (when)",
            "chips": [
              {
                "role": "subj",
                "text": "I"
              },
              {
                "role": "aux",
                "text": "was doing"
              },
              {
                "role": "obj",
                "text": "research"
              },
              {
                "role": "sig",
                "text": "when"
              },
              {
                "role": "verb",
                "text": "the power went out."
              }
            ],
            "exampleEn": "While they were working in the lab, Ali found the answer.",
            "exampleFa": "در حالی که در آزمایشگاه کار می‌کردند، علی پاسخ را یافت.",
            "learnerGlossFa": "مشغول تحقیق بودم که برق قطع شد."
          },
          {
            "label": "ضمیر انعکاسی / تأکیدی",
            "chips": [
              {
                "role": "subj",
                "text": "Alexander Fleming"
              },
              {
                "role": "aux",
                "text": "himself"
              },
              {
                "role": "verb",
                "text": "discovered"
              },
              {
                "role": "obj",
                "text": "penicillin."
              }
            ],
            "exampleEn": "Maryam burned herself while cooking.",
            "exampleFa": "مریم هنگام آشپزی خودش را سوزاند.",
            "learnerGlossFa": "خود الکساندر فلمینگ پنی‌سیلین را کشف کرد."
          }
        ],
        "signals": [
          "at 8 last night",
          "when + Simple Past",
          "while + Past Progressive",
          "by myself (= alone)",
          "know / believe / want (بدون ing!)"
        ],
        "traps": [
          {
            "wrong": "She was knowing the answer when I asked.",
            "right": "She knew the answer when I asked.",
            "noteFa": "فعل‌هایی مانند «know»، «believe»، «like»، «need» و «understand» در معنای حالتی معمولاً استمراری به کار نمی‌روند."
          },
          {
            "wrong": "Ali and Reza built the robot himself.",
            "right": "Ali and Reza built the robot themselves.",
            "noteFa": "فاعل «Ali and Reza» جمع است؛ پس ضمیر انعکاسی آن «themselves» است."
          }
        ],
        "timelineType": "past_interrupt",
        "timelineCaptionFa": "موج ممتد گذشته استمراری (was/were V-ing) که با نقطه گذشته ساده (when + Past) تلاقی می‌کند",
        "contextDialogue": {
          "lineA": "What was Fleming doing when he discovered penicillin?",
          "faA": "فلمینگ مشغول چه کاری بود که پنی‌سیلین را کشف کرد؟",
          "lineB": "He himself was working in his lab when he noticed a strange mold.",
          "faB": "او خودش مشغول کار در آزمایشگاهش بود که متوجه کپک عجیبی شد."
        },
        "guidedDiscovery": {
          "questionFa": "چرا برای بیان دانستن پاسخ در این زمان گذشته، به‌جای «was knowing» معمولاً از «knew» استفاده می‌کنیم؟",
          "options": [
            "چون «know» و مانند آن در معنای حالتی معمولاً استمراری به کار نمی‌روند.",
            "چون know فعل باقاعده است",
            "فقط در زمان حال ing می‌گیرد"
          ],
          "correctIdx": 0,
          "insightFa": "افعال حالتی (State Verbs) مانند «know» در معنای حالتی معمولاً استمراری نمی‌شوند؛ این به معنی ممنوع‌بودن همهٔ کاربردهای «-ing» نیست."
        },
        "threeD": {
          "formFa": "was/were + V-ing + when + Simple Past | While + was/were + V-ing | ضمایر انعکاسی (-self / -selves)",
          "meaningFa": "توصیف بستر در حال جریان یک رویداد در گذشته + هم‌مرجع بودن فاعل و مفعول یا تأکید",
          "useFa": "روایت کشفیات علمی در گذشته و پرهیز از افزودن ing به افعال حسی، مالکیت و ذهنی"
        },
        "learnerGuide": {
          "explainFa": "گذشتهٔ استمراری از was یا were و شکل ing فعل ساخته می‌شود و کاری را در حال جریان در زمانی در گذشته نشان می‌دهد؛ وجود یک رویداد دوم همیشه لازم نیست. در الگوی رایج، when می‌تواند رویداد دیگری را معرفی کند. ضمیر انعکاسی به خود فاعل برمی‌گردد. فعل‌هایی مثل know در معنای حالتی معمولاً استمراری نمی‌شوند؛ این به معنی ممنوع‌بودن تمام کاربردهای ing نیست.",
          "examples": [
            {
              "en": "I was studying at eight.",
              "fa": "من ساعت هشت مشغول درس‌خواندن بودم."
            },
            {
              "en": "She hurt herself.",
              "fa": "او به خودش آسیب زد."
            },
            {
              "en": "Knowing the answer, she raised her hand.",
              "fa": "چون پاسخ را می‌دانست، دستش را بالا برد."
            }
          ]
        }
      },
      {
        "id": 4,
        "titleEn": "Lesson 4: Traveling the World",
        "titleFa": "درس ۴: افعال وجهی (Modals)، حروف اضافه و قیدهای حالت (Adverbs)",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "افعال وجهی «must / mustn't» (اجبار قوی و ممنوعیت)، «should / shouldn't» (توصیه) و «may / might / can / could» (احتمال و اجازه) همگی با «شکل ساده فعل بدون to» همراه می‌شوند. قید حالت چگونگی انجام فعل را توصیف می‌کند و اغلب با افزودن «-ly» به صفت ساخته می‌شود، اما «fast, hard, early, late» هم صفت‌اند و هم قید، و قیدِ «good» واژه «well» است!",
        "formulas": [
          {
            "label": "افعال وجهی (Modal)",
            "chips": [
              {
                "role": "subj",
                "text": "Travelers"
              },
              {
                "role": "aux",
                "text": "must"
              },
              {
                "role": "verb",
                "text": "keep"
              },
              {
                "role": "obj",
                "text": "their passports safe."
              }
            ],
            "exampleEn": "Take a map; you might get lost in the desert.",
            "exampleFa": "نقشه ببر؛ ممکن است در کویر گم شوی.",
            "learnerGlossFa": "مسافران باید گذرنامه‌هایشان را در جای امن نگه دارند."
          },
          {
            "label": "قید حالت (Manner)",
            "chips": [
              {
                "role": "subj",
                "text": "The tour guide"
              },
              {
                "role": "verb",
                "text": "speaks"
              },
              {
                "role": "obj",
                "text": "English"
              },
              {
                "role": "sig",
                "text": "fluently / well."
              }
            ],
            "exampleEn": "The receptionist greeted the guests politely.",
            "exampleFa": "مسئول پذیرش مؤدبانه به مهمانان خوشامد گفت.",
            "learnerGlossFa": "راهنمای تور انگلیسی را روان یا خوب صحبت می‌کند."
          }
        ],
        "signals": [
          "must (اجبار)",
          "mustn't (ممنوعیت)",
          "may / might (احتمال)",
          "should (توصیه)",
          "good → well",
          "fast / hard (بدون ly!)"
        ],
        "traps": [
          {
            "wrong": "He drives very fastly and carelessly.",
            "right": "He drives very fast and carelessly.",
            "noteFa": "در کاربرد معمول، قید «fast» همان «fast» است و «hard» می‌تواند قید به معنی «با تلاش زیاد» باشد. «hardly» معمولاً یعنی «تقریباً نه»؛ «hardly ever» یعنی «به‌ندرت»."
          },
          {
            "wrong": "Passengers must to fasten their seatbelts.",
            "right": "Passengers must fasten their seatbelts.",
            "noteFa": "بعد از هیچ‌یک از مدال‌ها (must, should, may, might, can, could) حرف «to» نمی‌آید."
          }
        ],
        "timelineType": "scale_compare",
        "timelineCaptionFa": "طیف قدرت افعال وجهی: احتمال (may/might) ← توصیه (should) ← الزام و ممنوعیت (must/mustn't)",
        "contextDialogue": {
          "lineA": "All passengers must show their passports here, and they mustn't leave bags unattended.",
          "faA": "همه مسافران باید گذرنامه‌شان را اینجا نشان دهند و نباید کیف‌ها را بی‌صاحب رها کنند.",
          "lineB": "Thank you! Our tour guide explained all the rules very clearly and spoke English well.",
          "faB": "سپاسگزارم! راهنمای تور ما همه قوانین را بسیار روشن توضیح داد و انگلیسی را خوب صحبت کرد."
        },
        "guidedDiscovery": {
          "questionFa": "در جمله دوم، چرا برای توصیف «spoke» از «well» استفاده شد و نه «good»؟",
          "options": [
            "چون برای توصیف چگونگی انجام فعل به قید حالت (Adverb) نیاز داریم و قیدِ good واژه well است",
            "چون good فقط برای جمع است",
            "چون جمله گذشته است"
          ],
          "correctIdx": 0,
          "insightFa": "عالی! صفت اسم را توصیف می‌کند (good speaker)، اما قید فعل را توصیف می‌کند (speaks well / drives fast / works hard)."
        },
        "threeD": {
          "formFa": "can/could/may/might/should/must + Base Verb (بدون to!) | Writing: Adj + ly و قیدهای بی‌قاعده",
          "meaningFa": "بیان اجازه، احتمال، توصیه اخلاقی، ضرورت قانونی و چگونگی انجام کنش",
          "useFa": "تمایز «mustn’t» (ممنوعیت) از «don’t have to» (عدم ضرورت) و «hard» (با تلاش زیاد) از «hardly» (تقریباً نه)."
        },
        "learnerGuide": {
          "explainFa": "فعل وجهی پیش از شکل سادهٔ فعل اصلی می‌آید. Must الزام، mustn’t ممنوعیت و should توصیه را بیان می‌کند؛ may و might می‌توانند احتمال را نشان دهند. قید حالت توضیح می‌دهد کار چگونه انجام شده است؛ برای نمونه قید مربوط به good، واژهٔ well است.",
          "examples": [
            {
              "en": "You must wear a helmet.",
              "fa": "باید کلاه ایمنی بپوشی."
            },
            {
              "en": "She speaks English well.",
              "fa": "او انگلیسی را خوب صحبت می‌کند."
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "v1_l1_1",
        "lesson": 1,
        "ruleTag": "پیش‌بینی با شاهد عینی",
        "sentence": "Look at those black clouds! It is going to snow heavily.",
        "target": "is going to",
        "cloze": "Look at those black clouds! It _____ snow heavily.",
        "promptHint": "will / be going to",
        "options": [
          "is going to",
          "is going",
          "are going to",
          "going to"
        ],
        "fa": "به آن ابرهای سیاه نگاه کن! قرار است برف سنگینی ببارد.",
        "explainFa": "برای پیش‌بینی بر اساس نشانه‌ای که الان می‌بینیم (black clouds) «is going to» می‌آید؛ «is» و «to» هر دو لازم‌اند.",
        "chunks": [
          "Look at those",
          "black clouds! It",
          "going to",
          "snow heavily."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is going to",
        "flawedSentence": "Look at those black clouds! It going to snow heavily.",
        "matchLeft": "مدرک عینی در حال",
        "matchRight": "be going to"
      },
      {
        "id": "v1_l1_2",
        "lesson": 1,
        "ruleTag": "تصمیم آنی و قول با will",
        "sentence": "Your suitcase looks very heavy; wait, I will carry it for you.",
        "target": "will carry",
        "cloze": "Your suitcase looks very heavy; wait, I _____ it for you.",
        "promptHint": "will + base",
        "options": [
          "will carry",
          "will to carry",
          "carries",
          "carried"
        ],
        "fa": "چمدانت خیلی سنگین به نظر می‌رسد؛ صبر کن، من آن را برایت می‌آورم.",
        "explainFa": "برای تصمیم لحظه‌ای و پیشنهاد کمک در حین صحبت از «will + فعل ساده» استفاده می‌شود.",
        "chunks": [
          "Your suitcase looks very",
          "heavy; wait, I",
          "will to carry",
          "it for you."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "will carry",
        "flawedSentence": "Your suitcase looks very heavy; wait, I will to carry it for you.",
        "matchLeft": "تصمیم آنی در صحبت",
        "matchRight": "will + V"
      },
      {
        "id": "v1_l1_3",
        "lesson": 1,
        "ruleTag": "برنامه از پیش تعیین‌شده",
        "sentence": "We have already bought the paint; we are going to paint our classroom tomorrow.",
        "target": "are going to",
        "cloze": "We have already bought the paint; we _____ paint our classroom tomorrow.",
        "promptHint": "prior plan",
        "options": [
          "are going to",
          "going to",
          "is going to",
          "are going"
        ],
        "fa": "ما قبلاً رنگ را خریده‌ایم؛ فردا قصد داریم کلاسمان را رنگ بزنیم.",
        "explainFa": "وقتی مقدمات کار قبلاً فراهم شده (bought the paint)، قصدِ از پیش تعیین‌شده با «are going to» بیان می‌شود.",
        "chunks": [
          "We have already bought",
          "the paint; we",
          "going to",
          "paint our classroom tomorrow."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "are going to",
        "flawedSentence": "We have already bought the paint; we going to paint our classroom tomorrow.",
        "matchLeft": "قصد و تدارک قبلی",
        "matchRight": "am/is/are going to",
        "noTyping": true
      },
      {
        "id": "v1_l1_4",
        "lesson": 1,
        "ruleTag": "پیش‌بینی با I think",
        "sentence": "Scientists hope that clean energy will protect endangered animals in the future.",
        "target": "will protect",
        "cloze": "Scientists hope that clean energy _____ endangered animals in the future.",
        "promptHint": "future with hope",
        "options": [
          "will protect",
          "will protects",
          "are going to protect",
          "protected"
        ],
        "fa": "دانشمندان امیدوارند انرژی پاک در آینده از حیوانات در خطر انقراض محافظت کند.",
        "explainFa": "همراه افعال «think, hope, promise» برای آینده از «will + فعل ساده» استفاده می‌کنیم.",
        "chunks": [
          "Scientists hope",
          "that clean energy",
          "will protects",
          "endangered animals in the future."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "will protect",
        "flawedSentence": "Scientists hope that clean energy will protects endangered animals in the future.",
        "matchLeft": "I hope / I think",
        "matchRight": "will + فعل ساده",
        "noTyping": true
      },
      {
        "id": "v1_l1_5",
        "lesson": 1,
        "ruleTag": "Writing: جمع بی‌قاعده اسم",
        "sentence": "Hunters must not hurt the wolves and deer in Golestan National Park.",
        "target": "wolves",
        "cloze": "Hunters must not hurt the _____ and deer in Golestan National Park.",
        "promptHint": "plural of wolf",
        "options": [
          "wolves",
          "wolfs",
          "wolfes",
          "a wolves"
        ],
        "fa": "شکارچیان نباید به گرگ‌ها و گوزن‌ها در پارک ملی گلستان آسیب بزنند.",
        "explainFa": "جمع «wolf» به «wolves» تبدیل می‌شود (و جمع deer همان deer باقی می‌ماند!).",
        "chunks": [
          "Hunters must not hurt the",
          "wolfs",
          "and deer in",
          "Golestan National Park."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wolves",
        "flawedSentence": "Hunters must not hurt the wolfs and deer in Golestan National Park.",
        "matchLeft": "جمعِ wolf / leaf",
        "matchRight": "wolves / leaves"
      },
      {
        "id": "v1_l1_6",
        "lesson": 1,
        "ruleTag": "Writing: جمع بی‌قاعده children",
        "sentence": "All the children visited the natural history museum yesterday.",
        "target": "children",
        "cloze": "All the _____ visited the natural history museum yesterday.",
        "promptHint": "plural of child",
        "options": [
          "children",
          "childs",
          "childrens",
          "child"
        ],
        "fa": "همه کودکان دیروز از موزه تاریخ طبیعی بازدید کردند.",
        "explainFa": "جمع بی‌قاعده «child» واژه «children» است (افزودن s به children غلط است!).",
        "chunks": [
          "All the",
          "childrens",
          "visited the natural",
          "history museum yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "children",
        "flawedSentence": "All the childrens visited the natural history museum yesterday.",
        "matchLeft": "جمعِ child / mouse",
        "matchRight": "children / mice"
      },
      {
        "id": "v1_l1_7",
        "lesson": 1,
        "ruleTag": "نفی زمان آینده won't",
        "sentence": "Responsible citizens won't throw plastic bottles into rivers.",
        "target": "won't throw",
        "cloze": "Responsible citizens _____ plastic bottles into rivers.",
        "promptHint": "will not + V",
        "options": [
          "won't throw",
          "won't throws",
          "aren't throw",
          "don't will throw"
        ],
        "fa": "شهروندان مسئولیت‌پذیر بطری‌های پلاستیکی را در رودخانه‌ها نخواهند انداخت.",
        "explainFa": "شکل منفی «will» عبارت «won't + شکل ساده فعل» است.",
        "chunks": [
          "Responsible citizens",
          "won't throws",
          "plastic bottles",
          "into rivers."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "won't throw",
        "flawedSentence": "Responsible citizens won't throws plastic bottles into rivers.",
        "matchLeft": "will not + V",
        "matchRight": "won't throw",
        "noTyping": true
      },
      {
        "id": "v1_l1_8",
        "lesson": 1,
        "ruleTag": "Writing: حروف بزرگ اسامی خاص",
        "sentence": "Lake Urmia and the Persian Gulf are precious natural wonders of Iran.",
        "target": "Persian Gulf",
        "cloze": "Lake Urmia and the _____ are precious natural wonders of Iran.",
        "promptHint": "proper noun caps",
        "options": [
          "Persian Gulf",
          "persian gulf",
          "persian Gulf",
          "Persian gulf"
        ],
        "fa": "دریاچه ارومیه و خلیج‌فارس از شگفتی‌های طبیعی ارزشمند ایران هستند.",
        "explainFa": "تمام بخش‌های اسامی خاص جغرافیایی (Lake Urmia, Persian Gulf, Mount Damavand) با حروف بزرگ آغاز می‌شوند.",
        "chunks": [
          "Lake Urmia and the",
          "persian gulf",
          "are precious natural",
          "wonders of Iran."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "Persian Gulf",
        "flawedSentence": "Lake Urmia and the persian gulf are precious natural wonders of Iran.",
        "matchLeft": "اسم خاص جغرافیایی",
        "matchRight": "حروف بزرگ (Capital)",
        "noTyping": true
      },
      {
        "id": "v1_l2_1",
        "lesson": 2,
        "ruleTag": "صفت برابری as ... as",
        "sentence": "No other planet in our solar system is as big as Jupiter.",
        "target": "as big as",
        "cloze": "No other planet in our solar system is _____ Jupiter.",
        "promptHint": "equative adj",
        "options": [
          "as big as",
          "bigger as",
          "as bigger as",
          "so big than"
        ],
        "fa": "هیچ سیاره دیگری در منظومه شمسی ما به بزرگی مشتری نیست.",
        "explainFa": "بین «as ... as» حتماً شکل ساده صفت (big) قرار می‌گیرد، نه شکل تفضیلی!",
        "chunks": [
          "No other planet in",
          "our solar system is",
          "as bigger as",
          "Jupiter."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "as big as",
        "flawedSentence": "No other planet in our solar system is as bigger as Jupiter.",
        "matchLeft": "as + ___ + as",
        "matchRight": "صفت ساده (big)",
        "noTyping": true
      },
      {
        "id": "v1_l2_2",
        "lesson": 2,
        "ruleTag": "صفت عالی چندسیلابی",
        "sentence": "The human brain is one of the most amazing wonders of creation.",
        "target": "the most amazing",
        "cloze": "The human brain is one of _____ wonders of creation.",
        "promptHint": "superlative",
        "options": [
          "the most amazing",
          "more amazing",
          "most amazing",
          "the amazingest"
        ],
        "fa": "مغز انسان یکی از شگفت‌انگیزترین عجایب آفرینش است.",
        "explainFa": "در عبارت «one of the ...» برای صفت چندبخشی «amazing» از «the most amazing» استفاده می‌کنیم.",
        "chunks": [
          "The human brain",
          "is one of",
          "more amazing",
          "wonders of creation."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "the most amazing",
        "flawedSentence": "The human brain is one of more amazing wonders of creation.",
        "matchLeft": "عالی چندبخشی",
        "matchRight": "the most + صفت",
        "noTyping": true
      },
      {
        "id": "v1_l2_3",
        "lesson": 2,
        "ruleTag": "صفت تفضیلی بی‌قاعده worse",
        "sentence": "Air pollution in winter is much worse than it is in spring.",
        "target": "worse",
        "cloze": "Air pollution in winter is much _____ than it is in spring.",
        "promptHint": "bad → comparative",
        "options": [
          "worse",
          "badder",
          "more bad",
          "the worst"
        ],
        "fa": "آلودگی هوا در زمستان بسیار بدتر از بهار است.",
        "explainFa": "با وجود «than»، شکل تفضیلی بی‌قاعده «bad» یعنی «worse» صحیح است.",
        "chunks": [
          "Air pollution in",
          "winter is much",
          "more bad",
          "than it is in spring."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "worse",
        "flawedSentence": "Air pollution in winter is much more bad than it is in spring.",
        "matchLeft": "bad (تفضیلی)",
        "matchRight": "worse than"
      },
      {
        "id": "v1_l2_4",
        "lesson": 2,
        "ruleTag": "صفت عالی کوتاه با in",
        "sentence": "Mount Damavand is the highest mountain in Iran.",
        "target": "the highest",
        "cloze": "Mount Damavand is _____ mountain in Iran.",
        "promptHint": "high → superlative",
        "options": [
          "the highest",
          "higher",
          "most high",
          "the most high"
        ],
        "fa": "کوه دماوند بلندترین کوه در ایران است.",
        "explainFa": "وجود «in Iran» نشانه برتری در یک مجموعه است؛ پس صفت عالی «the highest» به کار می‌رود.",
        "chunks": [
          "Mount Damavand",
          "is",
          "higher",
          "mountain in Iran."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "the highest",
        "flawedSentence": "Mount Damavand is higher mountain in Iran.",
        "matchLeft": "___ peak in Iran",
        "matchRight": "the highest"
      },
      {
        "id": "v1_l2_5",
        "lesson": 2,
        "ruleTag": "Writing: ترتیب صفات پیش از اسم",
        "sentence": "My grandmother gave me a beautiful old Persian carpet.",
        "target": "beautiful old Persian",
        "cloze": "My grandmother gave me a _____ carpet.",
        "promptHint": "adj order",
        "options": [
          "beautiful old Persian",
          "Persian old beautiful",
          "old Persian beautiful",
          "Persian beautiful old"
        ],
        "fa": "مادربزرگم یک فرش زیبای قدیمی ایرانی به من هدیه داد.",
        "explainFa": "ترتیب صفات پیش از اسم: نظر (beautiful) ← سن (old) ← ملیت (Persian).",
        "chunks": [
          "My grandmother",
          "gave me a",
          "Persian old beautiful",
          "carpet."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "beautiful old Persian",
        "flawedSentence": "My grandmother gave me a Persian old beautiful carpet.",
        "matchLeft": "نظر + سن + ملیت",
        "matchRight": "beautiful old Persian",
        "noTyping": true
      },
      {
        "id": "v1_l2_6",
        "lesson": 2,
        "ruleTag": "Writing: صفت جنس نزدیک به اسم",
        "sentence": "The scientist keeps his old notes in a small brown wooden box.",
        "target": "small brown wooden",
        "cloze": "The scientist keeps his old notes in a _____ box.",
        "promptHint": "adj order",
        "options": [
          "small brown wooden",
          "wooden small brown",
          "brown wooden small",
          "wooden brown small"
        ],
        "fa": "آن دانشمند یادداشت‌های قدیمی‌اش را در یک جعبه چوبی قهوه‌ای کوچک نگه می‌دارد.",
        "explainFa": "ترتیب درست: اندازه (small) ← رنگ (brown) ← جنس (wooden) بلافاصله قبل از اسم.",
        "chunks": [
          "The scientist keeps his",
          "old notes in a",
          "wooden small brown",
          "box."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "small brown wooden",
        "flawedSentence": "The scientist keeps his old notes in a wooden small brown box.",
        "matchLeft": "اندازه + رنگ + جنس",
        "matchRight": "small brown wooden",
        "noTyping": true
      },
      {
        "id": "v1_l2_7",
        "lesson": 2,
        "ruleTag": "صفت تفضیلی چندبخشی با than",
        "sentence": "Gold is much more expensive than silver and copper.",
        "target": "more expensive",
        "cloze": "Gold is much _____ than silver and copper.",
        "promptHint": "comparative",
        "options": [
          "more expensive",
          "expensiver",
          "most expensive",
          "as expensive"
        ],
        "fa": "طلا بسیار گران‌تر از نقره و مس است.",
        "explainFa": "همراه «than» برای صفت سه بخشی «expensive» از «more expensive» استفاده می‌شود.",
        "chunks": [
          "Gold is much",
          "expensiver",
          "than silver",
          "and copper."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "more expensive",
        "flawedSentence": "Gold is much expensiver than silver and copper.",
        "matchLeft": "صفت بلند + than",
        "matchRight": "more + صفت",
        "noTyping": true
      },
      {
        "id": "v1_l2_8",
        "lesson": 2,
        "ruleTag": "صفت عالی بی‌قاعده the best",
        "sentence": "Prevention is always the best cure for contagious diseases.",
        "target": "the best",
        "cloze": "Prevention is always _____ cure for contagious diseases.",
        "promptHint": "good → superlative",
        "options": [
          "the best",
          "better",
          "the goodest",
          "most good"
        ],
        "fa": "پیشگیری همواره بهترین درمان برای بیماری‌های واگیردار است.",
        "explainFa": "صفت عالی بی‌قاعده از «good» عبارت «the best» است.",
        "chunks": [
          "Prevention is always",
          "the goodest",
          "cure for",
          "contagious diseases."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "the best",
        "flawedSentence": "Prevention is always the goodest cure for contagious diseases.",
        "matchLeft": "good (صفت عالی)",
        "matchRight": "the best"
      },
      {
        "id": "v1_l3_1",
        "lesson": 3,
        "ruleTag": "گذشته استمراری با when",
        "sentence": "Avicenna was reading an old manuscript when his student knocked at the door.",
        "target": "was reading",
        "cloze": "Avicenna _____ an old manuscript when his student knocked at the door.",
        "promptHint": "past prog.",
        "options": [
          "was reading",
          "is reading",
          "were reading",
          "was read"
        ],
        "fa": "ابن‌سینا مشغول خواندن نسخه‌ای خطی بود که شاگردش در زد.",
        "explainFa": "عمل طولانیِ در جریان قبل از «when + knocked» با گذشته استمراری «was reading» بیان می‌شود.",
        "chunks": [
          "Avicenna",
          "is reading",
          "an old manuscript when his",
          "student knocked at the door."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "was reading",
        "flawedSentence": "Avicenna is reading an old manuscript when his student knocked at the door.",
        "matchLeft": "___ when he arrived",
        "matchRight": "was/were + V-ing",
        "noTyping": true
      },
      {
        "id": "v1_l3_2",
        "lesson": 3,
        "ruleTag": "هم‌زمانی با While",
        "sentence": "While the researchers were testing the vaccine, the power suddenly went out.",
        "target": "were testing",
        "cloze": "While the researchers _____ the vaccine, the power suddenly went out.",
        "promptHint": "while + past prog",
        "options": [
          "were testing",
          "was testing",
          "testing",
          "are testing"
        ],
        "fa": "در حالی که پژوهشگران مشغول آزمایش واکسن بودند، ناگهان برق قطع شد.",
        "explainFa": "بعد از «While» با فاعل جمع (researchers) در گذشته، «were testing» صحیح است.",
        "chunks": [
          "While the researchers",
          "was testing",
          "the vaccine, the power",
          "suddenly went out."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were testing",
        "flawedSentence": "While the researchers was testing the vaccine, the power suddenly went out.",
        "matchLeft": "While + فاعل جمع",
        "matchRight": "were + V-ing",
        "noTyping": true
      },
      {
        "id": "v1_l3_3",
        "lesson": 3,
        "ruleTag": "ضمیر تأکیدی مؤنث herself",
        "sentence": "Marie Curie herself worked day and night in a simple laboratory.",
        "target": "herself",
        "cloze": "Marie Curie _____ worked day and night in a simple laboratory.",
        "promptHint": "reflexive pronoun",
        "options": [
          "herself",
          "himself",
          "itself",
          "themselves"
        ],
        "fa": "ماری کوری خودش شبانه‌روز در یک آزمایشگاه ساده کار می‌کرد.",
        "explainFa": "برای فاعل مؤنث مفرد (Marie Curie) ضمیر تأکیدی «herself» به کار می‌رود.",
        "chunks": [
          "Marie Curie",
          "himself",
          "worked day and night",
          "in a simple laboratory."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "herself",
        "flawedSentence": "Marie Curie himself worked day and night in a simple laboratory.",
        "matchLeft": "Marie Curie",
        "matchRight": "herself",
        "noTyping": true
      },
      {
        "id": "v1_l3_4",
        "lesson": 3,
        "ruleTag": "اصطلاح by themselves",
        "sentence": "Nobody helped the students; they solved all the physics problems by themselves.",
        "target": "themselves",
        "cloze": "Nobody helped the students; they solved all the physics problems by _____.",
        "promptHint": "by + reflexive",
        "options": [
          "themselves",
          "themself",
          "ourselves",
          "himself"
        ],
        "fa": "هیچ‌کس به دانش‌آموزان کمک نکرد؛ آن‌ها همه مسائل فیزیک را به‌تنهایی حل کردند.",
        "explainFa": "عبارت «by themselves» برای ضمیر «they» به معنای «به‌تنهایی و بدون کمک» است (واژه themself غلط است!).",
        "chunks": [
          "Nobody helped the students;",
          "they solved all",
          "the physics problems by",
          "themself."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "themselves.",
        "flawedSentence": "Nobody helped the students; they solved all the physics problems by themself.",
        "matchLeft": "they (بدون کمک)",
        "matchRight": "by themselves",
        "noTyping": true
      },
      {
        "id": "v1_l3_5",
        "lesson": 3,
        "ruleTag": "Writing: ممنوعیت ing برای افعال حالتی",
        "sentence": "At that moment, Edison knew that his new invention would change the world.",
        "target": "knew",
        "cloze": "At that moment, Edison _____ that his new invention would change the world.",
        "promptHint": "state verb (know)",
        "options": [
          "knew",
          "was knowing",
          "is knowing",
          "knows"
        ],
        "fa": "در آن لحظه، ادیسون می‌دانست که اختراع جدیدش جهان را دگرگون خواهد کرد.",
        "explainFa": "در این جمله «know» معنای حالتیِ دانستن دارد و معمولاً استمراری نمی‌شود؛ گذشتهٔ سادهٔ آن «knew» است.",
        "chunks": [
          "At that moment, Edison",
          "was knowing",
          "that his new invention",
          "would change the world."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "knew",
        "flawedSentence": "At that moment, Edison was knowing that his new invention would change the world.",
        "matchLeft": "فعل حالتی know در گذشته",
        "matchRight": "knew (نه was knowing!)"
      },
      {
        "id": "v1_l3_6",
        "lesson": 3,
        "ruleTag": "Writing: فعل حالتی need",
        "sentence": "Right now, our school library needs more English dictionaries.",
        "target": "needs",
        "cloze": "Right now, our school library _____ more English dictionaries.",
        "promptHint": "state verb (need)",
        "options": [
          "needs",
          "is needing",
          "need",
          "are needing"
        ],
        "fa": "همین الان، کتابخانه مدرسه ما به فرهنگ‌لغت‌های انگلیسی بیشتری نیاز دارد.",
        "explainFa": "با وجود قید «Right now»، چون «need» فعل حالتی است استمراری نمی‌شود و «needs» می‌گیرد.",
        "chunks": [
          "Right now,",
          "our school library",
          "is needing",
          "more English dictionaries."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "needs",
        "flawedSentence": "Right now, our school library is needing more English dictionaries.",
        "matchLeft": "need / want + now",
        "matchRight": "حال ساده (بدون ing)"
      },
      {
        "id": "v1_l3_7",
        "lesson": 3,
        "ruleTag": "عمل قاطع با when + گذشته ساده",
        "sentence": "The students were doing an experiment when the bell rang.",
        "target": "rang",
        "cloze": "The students were doing an experiment when the bell _____.",
        "promptHint": "when + past simple",
        "options": [
          "rang",
          "was ringing",
          "rings",
          "ringed"
        ],
        "fa": "دانش‌آموزان مشغول انجام آزمایش بودند که زنگ به صدا درآمد.",
        "explainFa": "در این الگو، عمل کوتاهی که عمل طولانی (were doing) را قطع می‌کند با گذشتهٔ ساده می‌آید: «rang» (گذشتهٔ بی‌قاعدهٔ ring).",
        "chunks": [
          "The students were",
          "doing an experiment",
          "when the bell",
          "was ringing."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "rang.",
        "flawedSentence": "The students were doing an experiment when the bell was ringing.",
        "matchLeft": "was V-ing + when + ___",
        "matchRight": "گذشته ساده (rang)",
        "noTyping": true
      },
      {
        "id": "v1_l3_8",
        "lesson": 3,
        "ruleTag": "ضمیر انعکاسی مفعولی yourself",
        "sentence": "Be careful with that sharp scalpel, or you might cut yourself!",
        "target": "yourself",
        "cloze": "Be careful with that sharp scalpel, or you might cut _____!",
        "promptHint": "reflexive object",
        "options": [
          "yourself",
          "you",
          "yours",
          "himself"
        ],
        "fa": "مراقب آن تیغ تیز جراحی باش، وگرنه ممکن است دست خودت را ببری!",
        "explainFa": "وقتی فاعل و مفعول هر دو «you» مفرد باشند، ضمیر انعکاسی «yourself» الزامی است.",
        "chunks": [
          "Be careful with",
          "that sharp scalpel, or",
          "you might cut",
          "you!"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "yourself!",
        "flawedSentence": "Be careful with that sharp scalpel, or you might cut you!",
        "matchLeft": "you (مفرد، انعکاسی)",
        "matchRight": "yourself",
        "noTyping": true
      },
      {
        "id": "v1_l4_1",
        "lesson": 4,
        "ruleTag": "ممنوعیت شدید با mustn't",
        "sentence": "Tourists mustn't make a fire near dry trees in the forest.",
        "target": "mustn't",
        "cloze": "Tourists _____ make a fire near dry trees in the forest.",
        "promptHint": "prohibition",
        "options": [
          "mustn't",
          "mustn't to",
          "don't must",
          "should"
        ],
        "fa": "گردشگران نباید نزدیک درختان خشک در جنگل آتش روشن کنند.",
        "explainFa": "برای بیان ممنوعیت قانونی و خطر جدی از «mustn't + فعل ساده» استفاده می‌شود.",
        "chunks": [
          "Tourists",
          "mustn't to",
          "make a fire near",
          "dry trees in the forest."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "mustn't",
        "flawedSentence": "Tourists mustn't to make a fire near dry trees in the forest.",
        "matchLeft": "ممنوعیت قانونی",
        "matchRight": "mustn't + فعل ساده",
        "noTyping": true
      },
      {
        "id": "v1_l4_2",
        "lesson": 4,
        "ruleTag": "احتمال با may / might",
        "sentence": "Take a warm jacket with you; it might get cold in the desert at night.",
        "target": "might get",
        "cloze": "Take a warm jacket with you; it _____ cold in the desert at night.",
        "promptHint": "possibility",
        "options": [
          "might get",
          "might gets",
          "mustn't get",
          "might to get"
        ],
        "fa": "یک کاپشن گرم همراهت ببر؛ ممکن است شب در کویر هوا سرد شود.",
        "explainFa": "بیان احتمال در آینده با «may / might + شکل ساده فعل» ساخته می‌شود.",
        "chunks": [
          "Take a warm jacket",
          "with you; it",
          "might gets",
          "cold in the desert at night."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "might get",
        "flawedSentence": "Take a warm jacket with you; it might gets cold in the desert at night.",
        "matchLeft": "احتمال ضعیف در آینده",
        "matchRight": "may / might + V",
        "noTyping": true
      },
      {
        "id": "v1_l4_3",
        "lesson": 4,
        "ruleTag": "توصیه سفر با should",
        "sentence": "Foreign visitors should respect the local customs and traditions of their host country.",
        "target": "should respect",
        "cloze": "Foreign visitors _____ the local customs and traditions of their host country.",
        "promptHint": "advice modal",
        "options": [
          "should respect",
          "should respecting",
          "should to respect",
          "mustn't respect"
        ],
        "fa": "بازدیدکنندگان خارجی شایسته است به آداب‌ورسوم محلی کشور میزبان احترام بگذارند.",
        "explainFa": "توصیه اخلاقی و فرهنگی با «should + شکل ساده فعل» بیان می‌شود.",
        "chunks": [
          "Foreign visitors",
          "should to respect",
          "the local customs and",
          "traditions of their host country."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "should respect",
        "flawedSentence": "Foreign visitors should to respect the local customs and traditions of their host country.",
        "matchLeft": "توصیه فرهنگی",
        "matchRight": "should + V",
        "noTyping": true
      },
      {
        "id": "v1_l4_4",
        "lesson": 4,
        "ruleTag": "Writing: قید حالت بی‌قاعده well",
        "sentence": "The Iranian receptionist welcomed the foreign tourists very politely and spoke English well.",
        "target": "well",
        "cloze": "The Iranian receptionist welcomed the foreign tourists very politely and spoke English _____.",
        "promptHint": "adverb of good",
        "options": [
          "well",
          "good",
          "goodly",
          "very good"
        ],
        "fa": "مسئول پذیرش ایرانی بسیار مؤدبانه از گردشگران استقبال کرد و انگلیسی را خوب صحبت کرد.",
        "explainFa": "برای توصیف فعل «spoke» به قید حالت نیاز داریم و قیدِ صفت «good» واژه «well» است!",
        "chunks": [
          "The Iranian receptionist welcomed",
          "the foreign tourists very",
          "politely and spoke English",
          "good."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "well.",
        "flawedSentence": "The Iranian receptionist welcomed the foreign tourists very politely and spoke English good.",
        "matchLeft": "قید حالتِ صفت good",
        "matchRight": "well"
      },
      {
        "id": "v1_l4_5",
        "lesson": 4,
        "ruleTag": "Writing: قید حالت بدون ly (hard / fast)",
        "sentence": "All the rescue workers worked really hard to help the lost climbers.",
        "target": "hard",
        "cloze": "All the rescue workers worked really _____ to help the lost climbers.",
        "promptHint": "hard vs hardly",
        "options": [
          "hard",
          "hardly",
          "more hard",
          "hards"
        ],
        "fa": "همه امدادگران واقعاً سخت تلاش کردند تا به کوهنوردان گمشده کمک کنند.",
        "explainFa": "قید حالت «به‌سختی / پرتلاش» همان «hard» است! واژه «hardly» یعنی «به‌ندرت / تقریباً هیچ».",
        "chunks": [
          "All the rescue",
          "workers worked really",
          "hardly",
          "to help the lost climbers."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "hard",
        "flawedSentence": "All the rescue workers worked really hardly to help the lost climbers.",
        "matchLeft": "تلاش سخت (قید)",
        "matchRight": "work hard (نه hardly!)"
      },
      {
        "id": "v1_l4_6",
        "lesson": 4,
        "ruleTag": "Writing: صفت بعد از افعال ربطی look/seem",
        "sentence": "After the ten-hour flight, all the passengers looked extremely tired.",
        "target": "tired",
        "cloze": "After the ten-hour flight, all the passengers looked extremely _____.",
        "promptHint": "linking verb + adj",
        "options": [
          "tired",
          "tiredly",
          "tiring",
          "tire"
        ],
        "fa": "پس از پرواز ده‌ساعته، همه مسافران به‌شدت خسته به نظر می‌رسیدند.",
        "explainFa": "بعد از افعال حسی و ربطی (look, seem, feel, taste, smell) صفت می‌آید، نه قید «-ly»!",
        "chunks": [
          "After the ten-hour",
          "flight, all the",
          "passengers looked extremely",
          "tiredly."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "tired.",
        "flawedSentence": "After the ten-hour flight, all the passengers looked extremely tiredly.",
        "matchLeft": "look / feel / seem + ___",
        "matchRight": "صفت (بدون ly)",
        "noTyping": true
      },
      {
        "id": "v1_l4_7",
        "lesson": 4,
        "ruleTag": "اجبار با must",
        "sentence": "All passengers must show their boarding passes at the gate.",
        "target": "must show",
        "cloze": "All passengers _____ their boarding passes at the gate.",
        "promptHint": "obligation",
        "options": [
          "must show",
          "must showing",
          "must to show",
          "can't show"
        ],
        "fa": "همه مسافران باید کارت پرواز خود را در گیت نشان دهند.",
        "explainFa": "قانون و الزام رسمی با «must + شکل ساده فعل» بیان می‌شود.",
        "chunks": [
          "All passengers",
          "must showing",
          "their boarding passes",
          "at the gate."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "must show",
        "flawedSentence": "All passengers must showing their boarding passes at the gate.",
        "matchLeft": "الزام قانونی",
        "matchRight": "must + فعل ساده",
        "noTyping": true
      },
      {
        "id": "v1_l4_8",
        "lesson": 4,
        "ruleTag": "Writing: املای قید مختوم به y (-ily)",
        "sentence": "Fortunately, the plane landed safely and the children smiled happily.",
        "target": "happily",
        "cloze": "Fortunately, the plane landed safely and the children smiled _____.",
        "promptHint": "happy → adverb",
        "options": [
          "happily",
          "happyly",
          "happy",
          "more happy"
        ],
        "fa": "خوشبختانه هواپیما به سلامت نشست و کودکان با خوشحالی لبخند زدند.",
        "explainFa": "در صفت مختوم به «y» پس از همخوان (happy, easy, angry)، حرف y به «-ily» تبدیل می‌شود: «happily».",
        "chunks": [
          "Fortunately, the plane",
          "landed safely and",
          "the children smiled",
          "happyly."
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "happily.",
        "flawedSentence": "Fortunately, the plane landed safely and the children smiled happyly.",
        "matchLeft": "happy / easy + ly",
        "matchRight": "happily / easily"
      },
      {
        "id": "v1_l1_9",
        "lesson": 1,
        "ruleTag": "پیش‌بینی با شاهد عینی و is going to",
        "sentence": "Look at the sky! It is going to rain soon.",
        "target": "is going to",
        "cloze": "Look at the sky! It _____ rain soon.",
        "promptHint": "going",
        "options": [
          "is going to",
          "is going",
          "are going to",
          "going to"
        ],
        "fa": "به آسمان نگاه کن! به‌زودی باران خواهد بارید.",
        "explainFa": "برای پیش‌بینی بر اساس نشانه (Look at the sky!) «is going to» + فعل ساده می‌آید؛ «to» را نباید جا انداخت.",
        "chunks": [
          "Look at the",
          "sky! It",
          "is going",
          "rain soon."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is going to",
        "flawedSentence": "Look at the sky! It is going rain soon.",
        "matchLeft": "Look at the sky",
        "matchRight": "it is going to rain"
      },
      {
        "id": "v1_l1_10",
        "lesson": 1,
        "ruleTag": "قول و تصمیم با will",
        "sentence": "I will help you with your bags.",
        "target": "will",
        "cloze": "I _____ help you with your bags.",
        "promptHint": "will",
        "options": [
          "will",
          "am",
          "is",
          "will to"
        ],
        "fa": "من به تو کمک می‌کنم و کیف‌هایت را می‌برم.",
        "explainFa": "«will» برای تصمیم آنی و قول به‌کار می‌رود.",
        "chunks": [
          "I",
          "am",
          "help you with",
          "your bags."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "will",
        "flawedSentence": "I am help you with your bags.",
        "matchLeft": "I",
        "matchRight": "will help you",
        "noTyping": true
      },
      {
        "id": "v1_l1_11",
        "lesson": 1,
        "ruleTag": "برنامهٔ آینده با are going to",
        "sentence": "They are going to visit their grandparents next week.",
        "target": "are going to",
        "cloze": "They _____ visit their grandparents next week.",
        "promptHint": "going",
        "options": [
          "are going to",
          "will to",
          "going to",
          "are go to"
        ],
        "fa": "آن‌ها هفتهٔ آینده به دیدن پدربزرگ و مادربزرگشان می‌روند.",
        "explainFa": "برنامهٔ از پیش تعیین‌شده با «are going to» بیان می‌شود.",
        "chunks": [
          "They",
          "will to",
          "visit their grandparents",
          "next week."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are going to",
        "flawedSentence": "They will to visit their grandparents next week.",
        "matchLeft": "They",
        "matchRight": "are going to visit their grandparents"
      },
      {
        "id": "v1_l1_12",
        "lesson": 1,
        "ruleTag": "Writing: جمع بی‌قاعدهٔ child و children",
        "sentence": "Look! The children are running across the road.",
        "target": "children",
        "cloze": "Look! The _____ are running across the road.",
        "promptHint": "child",
        "options": [
          "children",
          "childs",
          "childrens",
          "child"
        ],
        "fa": "نگاه کن! بچه‌ها در حال دویدن در خیابان‌اند.",
        "explainFa": "جمع «children» بی‌قاعده است و با «-s» ساخته نمی‌شود.",
        "chunks": [
          "Look! The",
          "childs",
          "are running across",
          "the road."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "children",
        "flawedSentence": "Look! The childs are running across the road.",
        "matchLeft": "Look",
        "matchRight": "the children are running"
      },
      {
        "id": "v1_l1_13",
        "lesson": 1,
        "ruleTag": "Writing: جمع بی‌قاعدهٔ wolf و wolves",
        "sentence": "These wolves have long tails and sharp claws.",
        "target": "wolves",
        "cloze": "These _____ have long tails and sharp claws.",
        "promptHint": "wolf",
        "options": [
          "wolves",
          "wolfes",
          "wolfs",
          "wolf"
        ],
        "fa": "این گرگ‌ها دم‌های بلند و چنگال‌های تیز دارند.",
        "explainFa": "جمع «wolf» به شکل «wolves» نوشته می‌شود.",
        "chunks": [
          "These",
          "wolfes",
          "have long tails",
          "and sharp claws."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "wolves",
        "flawedSentence": "These wolfes have long tails and sharp claws.",
        "matchLeft": "These",
        "matchRight": "wolves have long tails"
      },
      {
        "id": "v1_l1_14",
        "lesson": 1,
        "ruleTag": "Writing: the با نام‌های جغرافیایی",
        "sentence": "The Persian Gulf and the Caspian Sea are rich in oil.",
        "target": "The",
        "cloze": "_____ Persian Gulf and the Caspian Sea are rich in oil.",
        "promptHint": "the / a / an",
        "options": [
          "The",
          "A",
          "An",
          "This"
        ],
        "fa": "خلیج فارس و دریای خزر سرشار از نفت هستند.",
        "explainFa": "نام‌های خاص جغرافیایی مانند خلیج فارس با «The» شروع می‌شوند.",
        "chunks": [
          "A",
          "Persian Gulf and",
          "the Caspian Sea",
          "are rich",
          "in oil."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "The",
        "flawedSentence": "A Persian Gulf and the Caspian Sea are rich in oil.",
        "matchLeft": "The",
        "matchRight": "Persian Gulf and the Caspian Sea"
      },
      {
        "id": "v1_l1_15",
        "lesson": 1,
        "ruleTag": "پیش‌بینی شخصی با will",
        "sentence": "I think the weather will be fine tomorrow.",
        "target": "will",
        "cloze": "I think the weather _____ be fine tomorrow.",
        "promptHint": "will",
        "options": [
          "will",
          "is",
          "are",
          "will to"
        ],
        "fa": "فکر می‌کنم فردا هوا خوب باشد.",
        "explainFa": "پیش‌بینی شخصی با «I think» و «will» می‌آید.",
        "chunks": [
          "I think",
          "the weather",
          "is",
          "be fine tomorrow."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "will",
        "flawedSentence": "I think the weather is be fine tomorrow.",
        "matchLeft": "I think",
        "matchRight": "the weather will be fine",
        "noTyping": true
      },
      {
        "id": "v1_l2_9",
        "lesson": 2,
        "ruleTag": "تفضیلی صفات بلند با more",
        "sentence": "This book is more interesting than that one for me.",
        "target": "more interesting",
        "cloze": "This book is _____ than that one for me.",
        "promptHint": "than",
        "options": [
          "more interesting",
          "interestinger",
          "most interesting",
          "interestingly"
        ],
        "fa": "این کتاب برای من از آن یکی جالب‌تر است.",
        "explainFa": "صفت بلند «interesting» با «more» تفضیلی می‌شود؛ «-er» و «more» با هم نمی‌آیند.",
        "chunks": [
          "This book is",
          "interestinger",
          "than that one",
          "for me."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "more interesting",
        "flawedSentence": "This book is interestinger than that one for me.",
        "matchLeft": "This book",
        "matchRight": "is more interesting than that one",
        "noTyping": true
      },
      {
        "id": "v1_l2_10",
        "lesson": 2,
        "ruleTag": "عالی کوتاه با the -est",
        "sentence": "The Caspian Sea is the largest lake in the world.",
        "target": "the largest",
        "cloze": "The Caspian Sea is _____ lake in the world.",
        "promptHint": "the",
        "options": [
          "the largest",
          "the larger",
          "larger",
          "the most large"
        ],
        "fa": "دریای خزر بزرگ‌ترین دریاچهٔ جهان است.",
        "explainFa": "برای صفت کوتاه از الگوی «the -est» استفاده می‌کنیم: «the largest».",
        "chunks": [
          "The Caspian",
          "Sea is",
          "the larger",
          "lake in the world."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "the largest",
        "flawedSentence": "The Caspian Sea is the larger lake in the world.",
        "matchLeft": "The Caspian Sea",
        "matchRight": "is the largest lake"
      },
      {
        "id": "v1_l2_11",
        "lesson": 2,
        "ruleTag": "تفضیلی کوتاه با than",
        "sentence": "The Caspian Sea is larger than the Persian Gulf.",
        "target": "larger",
        "cloze": "The Caspian Sea is _____ than the Persian Gulf.",
        "promptHint": "than",
        "options": [
          "larger",
          "more larger",
          "more large",
          "large"
        ],
        "fa": "دریای خزر از خلیج فارس بزرگ‌تر است.",
        "explainFa": "صفت یک‌هجایی «large» با «-er» تفضیلی می‌شود: «larger than»؛ «more larger» دو بار تفضیلی است و غلط.",
        "chunks": [
          "The Caspian",
          "Sea is",
          "more larger",
          "than the Persian Gulf."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "larger",
        "flawedSentence": "The Caspian Sea is more larger than the Persian Gulf.",
        "matchLeft": "The Caspian Sea",
        "matchRight": "is larger than the Persian Gulf",
        "noTyping": true
      },
      {
        "id": "v1_l2_12",
        "lesson": 2,
        "ruleTag": "تفضیلی صفات بلند با than",
        "sentence": "Gold is more expensive than silver in the world market.",
        "target": "more expensive",
        "cloze": "Gold is _____ than silver in the world market.",
        "promptHint": "than",
        "options": [
          "more expensive",
          "expensiver",
          "most expensive",
          "more expensiver"
        ],
        "fa": "طلا در بازار جهانی از نقره گران‌تر است.",
        "explainFa": "صفت بلند «expensive» با «more» تفضیلی می‌شود.",
        "chunks": [
          "Gold is",
          "expensiver",
          "than silver in",
          "the world market."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "more expensive",
        "flawedSentence": "Gold is expensiver than silver in the world market.",
        "matchLeft": "Gold",
        "matchRight": "is more expensive than silver",
        "noTyping": true
      },
      {
        "id": "v1_l2_13",
        "lesson": 2,
        "ruleTag": "Writing: ترتیب نظر و اندازه",
        "sentence": "My new jacket is a nice small black leather jacket.",
        "target": "nice small",
        "cloze": "My new jacket is a _____ black leather jacket.",
        "promptHint": "nice",
        "options": [
          "nice small",
          "small nice",
          "small new nice",
          "nice smaller"
        ],
        "fa": "ژاکت جدید من یک ژاکت چرمی مشکی زیبا و کوچک است.",
        "explainFa": "ترتیب صفات چنین است: نظر → اندازه → سن → کیفیت → رنگ → ملیت → جنس؛ مثل «nice small».",
        "chunks": [
          "My new jacket",
          "is a",
          "small nice",
          "black leather jacket."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "nice small",
        "flawedSentence": "My new jacket is a small nice black leather jacket.",
        "matchLeft": "My new jacket",
        "matchRight": "is a nice small black leather jacket"
      },
      {
        "id": "v1_l2_14",
        "lesson": 2,
        "ruleTag": "تفضیلی important با more",
        "sentence": "Health is more important than money in our life.",
        "target": "more important",
        "cloze": "Health is _____ than money in our life.",
        "promptHint": "than",
        "options": [
          "more important",
          "importanter",
          "most important",
          "the more important"
        ],
        "fa": "سلامت در زندگی ما از پول مهم‌تر است.",
        "explainFa": "«important» صفت بلند است و با «more» تفضیلی می‌شود.",
        "chunks": [
          "Health is",
          "importanter",
          "than money in",
          "our life."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "more important",
        "flawedSentence": "Health is importanter than money in our life.",
        "matchLeft": "Health",
        "matchRight": "is more important than money",
        "noTyping": true
      },
      {
        "id": "v1_l2_15",
        "lesson": 2,
        "ruleTag": "برابری با as ... as",
        "sentence": "No other student in our class is as clever as Sara.",
        "target": "as clever",
        "cloze": "No other student in our class is _____ as Sara.",
        "promptHint": "as",
        "options": [
          "as clever",
          "more clever",
          "cleverer",
          "the cleverest"
        ],
        "fa": "هیچ دانش‌آموز دیگری در کلاس ما به اندازهٔ سارا باهوش نیست.",
        "explainFa": "مقایسهٔ برابر با «as + صفت + as» ساخته می‌شود: «as clever as Sara»؛ «more clever as» و «cleverer as» ترکیب غلطِ تفضیلی و برابری‌اند.",
        "chunks": [
          "No other student in",
          "our class is",
          "more clever",
          "as Sara."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "as clever",
        "flawedSentence": "No other student in our class is more clever as Sara.",
        "matchLeft": "No other student",
        "matchRight": "is as clever as Sara"
      },
      {
        "id": "v1_l3_9",
        "lesson": 3,
        "ruleTag": "گذشته استمراری با while",
        "sentence": "While we were having dinner, the phone rang.",
        "target": "were having",
        "cloze": "While we _____ dinner, the phone rang.",
        "promptHint": "have",
        "options": [
          "were having",
          "was having",
          "are having",
          "have"
        ],
        "fa": "هنگامی که شام می‌خوردیم، تلفن زنگ زد.",
        "explainFa": "«while» با گذشتهٔ استمراری و فعل گروهی به‌کار می‌رود.",
        "chunks": [
          "While we",
          "was having",
          "dinner, the",
          "phone rang."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were having",
        "flawedSentence": "While we was having dinner, the phone rang.",
        "matchLeft": "While we",
        "matchRight": "were having dinner"
      },
      {
        "id": "v1_l3_10",
        "lesson": 3,
        "ruleTag": "گذشته استمراری با when و فعل have",
        "sentence": "She was having dinner when her friends arrived.",
        "target": "was having",
        "cloze": "She _____ dinner when her friends arrived.",
        "promptHint": "have",
        "options": [
          "was having",
          "were having",
          "is having",
          "has"
        ],
        "fa": "وقتی دوستانش رسیدند، او داشت شام می‌خورد.",
        "explainFa": "«when» با گذشتهٔ استمراری برای کاری که در میانهٔ گذشته در جریان بود به‌کار می‌رود.",
        "chunks": [
          "She",
          "were having",
          "dinner when her",
          "friends arrived."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "was having",
        "flawedSentence": "She were having dinner when her friends arrived.",
        "matchLeft": "She",
        "matchRight": "was having dinner"
      },
      {
        "id": "v1_l3_11",
        "lesson": 3,
        "ruleTag": "ضمیر انعکاسی با themselves",
        "sentence": "The children enjoyed themselves in the garden yesterday.",
        "target": "enjoyed",
        "cloze": "The children _____ themselves in the garden yesterday.",
        "promptHint": "enjoy",
        "options": [
          "enjoyed",
          "enjoy",
          "enjoys",
          "enjoying"
        ],
        "fa": "بچه‌ها دیروز در باغ به خودشان خوش گذراندند.",
        "explainFa": "وقتی فاعل و مفعول یکی هستند از ضمیر انعکاسی مثل «themselves» استفاده می‌کنیم.",
        "chunks": [
          "The children",
          "enjoy",
          "themselves in the",
          "garden yesterday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "enjoyed",
        "flawedSentence": "The children enjoy themselves in the garden yesterday.",
        "matchLeft": "The children",
        "matchRight": "enjoyed themselves"
      },
      {
        "id": "v1_l3_12",
        "lesson": 3,
        "ruleTag": "ضمیر انعکاسی با herself",
        "sentence": "She hurt herself while cooking in the kitchen.",
        "target": "herself",
        "cloze": "She hurt _____ while cooking in the kitchen.",
        "promptHint": "she (ضمیر انعکاسی)",
        "options": [
          "herself",
          "himself",
          "themselves",
          "myself"
        ],
        "fa": "او هنگام آشپزی در آشپزخانه دست خودش را سوزاند.",
        "explainFa": "چون فاعل مؤنث است، ضمیر انعکاسی «herself» به‌کار می‌رود.",
        "chunks": [
          "She hurt",
          "himself",
          "while cooking in",
          "the kitchen."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "herself",
        "flawedSentence": "She hurt himself while cooking in the kitchen.",
        "matchLeft": "She hurt",
        "matchRight": "herself while cooking"
      },
      {
        "id": "v1_l3_13",
        "lesson": 3,
        "ruleTag": "Writing: فعل حالتی know",
        "sentence": "I knew that the answer was in the textbook.",
        "target": "was",
        "cloze": "I knew that the answer _____ in the textbook.",
        "promptHint": "be",
        "options": [
          "was",
          "were",
          "are",
          "be"
        ],
        "fa": "می‌دانستم که پاسخ در کتاب درسی بود.",
        "explainFa": "فاعل «the answer» مفرد است و بعد از «knew» (گذشته) فعل «was» می‌آید؛ «were» برای فاعل جمع است.",
        "chunks": [
          "I knew that",
          "the answer",
          "were",
          "in the textbook."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "was",
        "flawedSentence": "I knew that the answer were in the textbook.",
        "matchLeft": "I knew",
        "matchRight": "that the answer was in the textbook"
      },
      {
        "id": "v1_l3_14",
        "lesson": 3,
        "ruleTag": "Writing: فعل حالتی need با s",
        "sentence": "This soup needs more salt than the other one.",
        "target": "needs",
        "cloze": "This soup _____ more salt than the other one.",
        "promptHint": "need",
        "options": [
          "needs",
          "need",
          "needing",
          "is needing"
        ],
        "fa": "این سوپ به نمک بیشتری از آن یکی نیاز دارد.",
        "explainFa": "«need» فعل حالتی است و با «-s» می‌آید.",
        "chunks": [
          "This soup",
          "need",
          "more salt than",
          "the other one."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "needs",
        "flawedSentence": "This soup need more salt than the other one.",
        "matchLeft": "This soup",
        "matchRight": "needs more salt"
      },
      {
        "id": "v1_l3_15",
        "lesson": 3,
        "ruleTag": "Writing: know با have known",
        "sentence": "We have known each other since we were children.",
        "target": "have known",
        "cloze": "We _____ each other since we were children.",
        "promptHint": "know",
        "options": [
          "have known",
          "are knowing",
          "knows",
          "has known"
        ],
        "fa": "ما از وقتی بچه بودیم همدیگر را می‌شناسیم.",
        "explainFa": "برای دانستنی که از گذشته تا حال ادامه دارد، در این جمله «have known» مناسب است؛ «know» در معنای حالتی معمولاً استمراری نمی‌شود.",
        "chunks": [
          "We",
          "are knowing",
          "each other since",
          "we were children."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have known",
        "flawedSentence": "We are knowing each other since we were children.",
        "matchLeft": "We",
        "matchRight": "have known each other"
      },
      {
        "id": "v1_l4_9",
        "lesson": 4,
        "ruleTag": "اجبار با must و فعل ساده",
        "sentence": "Passengers must fasten their seatbelts during the flight.",
        "target": "must",
        "cloze": "Passengers _____ fasten their seatbelts during the flight.",
        "promptHint": "must",
        "options": [
          "must",
          "must to",
          "should to",
          "can to"
        ],
        "fa": "مسافران باید در طول پرواز کمربندهایشان را ببندند.",
        "explainFa": "پس از فعل‌های وجهی «must»، «should»، «may»، «might»، «can» و «could» شکل سادهٔ فعل می‌آید؛ «ought to» الگویی جداگانه دارد.",
        "chunks": [
          "Passengers",
          "must to",
          "fasten their seatbelts",
          "during the flight."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "must",
        "flawedSentence": "Passengers must to fasten their seatbelts during the flight.",
        "matchLeft": "Passengers",
        "matchRight": "must fasten their seatbelts",
        "noTyping": true
      },
      {
        "id": "v1_l4_10",
        "lesson": 4,
        "ruleTag": "ممنوعیت با mustn't",
        "sentence": "You mustn't use your phone inside the museum.",
        "target": "mustn't",
        "cloze": "You _____ use your phone inside the museum.",
        "promptHint": "must",
        "options": [
          "mustn't",
          "mustn't to",
          "don't must",
          "not must"
        ],
        "fa": "نباید داخل موزه از گوشی‌ات استفاده کنی.",
        "explainFa": "برای ممنوعیت «mustn't» + فعل ساده می‌آید؛ بعد از آن «to» نمی‌آید و «must» با «don't» منفی نمی‌شود.",
        "chunks": [
          "You",
          "mustn't to",
          "use your phone",
          "inside the museum."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "mustn't",
        "flawedSentence": "You mustn't to use your phone inside the museum.",
        "matchLeft": "You",
        "matchRight": "mustn't use your phone"
      },
      {
        "id": "v1_l4_11",
        "lesson": 4,
        "ruleTag": "احتمال با may",
        "sentence": "You may visit the museum again next year.",
        "target": "may",
        "cloze": "You _____ visit the museum again next year.",
        "promptHint": "may",
        "options": [
          "may",
          "may to",
          "must to",
          "should to"
        ],
        "fa": "ممکن است سال آینده دوباره از موزه دیدن کنی.",
        "explainFa": "«may» احتمال را نشان می‌دهد و فعل ساده می‌گیرد.",
        "chunks": [
          "You",
          "may to",
          "visit the museum",
          "again next year."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "may",
        "flawedSentence": "You may to visit the museum again next year.",
        "matchLeft": "You",
        "matchRight": "may visit the museum",
        "noTyping": true
      },
      {
        "id": "v1_l4_12",
        "lesson": 4,
        "ruleTag": "Writing: قید حالت با ly",
        "sentence": "He answered the question politely and calmly.",
        "target": "politely",
        "cloze": "He answered the question _____ and calmly.",
        "promptHint": "polite (شکل درست)",
        "options": [
          "politely",
          "polite",
          "politeness",
          "politly"
        ],
        "fa": "او مؤدبانه و آرام به سؤال پاسخ داد.",
        "explainFa": "«answered» فعل است و با قید حالت «politely» توصیف می‌شود؛ «polite» صفت است.",
        "chunks": [
          "He answered",
          "the question",
          "polite",
          "and calmly."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "politely",
        "flawedSentence": "He answered the question polite and calmly.",
        "matchLeft": "He answered",
        "matchRight": "the question politely"
      },
      {
        "id": "v1_l4_13",
        "lesson": 4,
        "ruleTag": "Writing: تفضیلی کوتاه بدون more",
        "sentence": "The old bridge is older than the new one.",
        "target": "older",
        "cloze": "The old bridge is _____ than the new one.",
        "promptHint": "than",
        "options": [
          "older",
          "more old",
          "oldest",
          "more older"
        ],
        "fa": "پل قدیمی از پل جدید پیرتر است.",
        "explainFa": "در مقایسهٔ معمول، صفت کوتاه «old» شکل تفضیلی «older» می‌گیرد.",
        "chunks": [
          "The old",
          "bridge is",
          "more old",
          "than the new one."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "older",
        "flawedSentence": "The old bridge is more old than the new one.",
        "matchLeft": "The old bridge",
        "matchRight": "is older than the new one",
        "noTyping": true
      },
      {
        "id": "v1_l4_14",
        "lesson": 4,
        "ruleTag": "Writing: صفت پس از look",
        "sentence": "The children looked exhausted after the long journey.",
        "target": "exhausted",
        "cloze": "The children looked _____ after the long journey.",
        "promptHint": "tired",
        "options": [
          "exhausted",
          "exhaust",
          "exhausting",
          "exhaustedly"
        ],
        "fa": "بچه‌ها بعد از سفر طولانی خسته به نظر می‌رسیدند.",
        "explainFa": "پس از «look» صفت می‌آید نه قید.",
        "chunks": [
          "The children looked",
          "exhaust",
          "after the",
          "long journey."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "exhausted",
        "flawedSentence": "The children looked exhaust after the long journey.",
        "matchLeft": "The children looked",
        "matchRight": "exhausted after the long journey",
        "noTyping": true
      },
      {
        "id": "v1_l4_15",
        "lesson": 4,
        "ruleTag": "Writing: تفضیلی well و better",
        "sentence": "He speaks English better than most of his classmates.",
        "target": "better",
        "cloze": "He speaks English _____ than most of his classmates.",
        "promptHint": "well",
        "options": [
          "better",
          "more well",
          "well",
          "more better"
        ],
        "fa": "او بهتر از بیشتر هم‌کلاسی‌هایش انگلیسی صحبت می‌کند.",
        "explainFa": "قید «good» به شکل «well» می‌آید و تفضیلی آن «better» است.",
        "chunks": [
          "He speaks English",
          "more well",
          "than most of",
          "his classmates."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "better",
        "flawedSentence": "He speaks English more well than most of his classmates.",
        "matchLeft": "He speaks English",
        "matchRight": "better than most of his classmates"
      }
    ],
    "onboarding": {
      "id": "v1_onboard",
      "sentence": "I think it will rain tomorrow.",
      "cloze": "I think it _____ rain tomorrow.",
      "target": "will",
      "options": [
        "will",
        "is",
        "was",
        "will to"
      ],
      "fa": "فکر می‌کنم فردا باران ببارد.",
      "explainFa": "برای پیش‌بینی آینده «will» + فعل ساده می‌آید: «will rain»."
    }
  },
  "vision_2": {
    "id": "vision_2",
    "name": "Vision 2",
    "titleFa": "پایه یازدهم",
    "modeBadgeFa": "گرامر و ساختار نوشتار امتحانی (Grammar & Exam Writing)",
    "lessonsCount": 3,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: Understanding People",
        "titleFa": "درس ۱: اسامی قابل‌شمارش و غیرقابل‌شمارش، کمیت‌نماها و جمله ساده",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "اسم‌های قابل‌شمارش می‌توانند مفرد یا جمع باشند و با «a / an» یا «many / a few» بیایند. اسم‌هایی مانند «information»، «advice»، «bread»، «money» و «furniture» در معنای غیرقابل‌شمارش معمولاً مفردند و «a little / much» می‌گیرند؛ برخی اسم‌ها در معنایی دیگر قابل‌شمارش هم می‌شوند. برای شمردن مقدار می‌توان از واحدهایی مانند «a piece of advice»، «a loaf of bread» یا «a cup of tea» استفاده کرد.",
        "formulas": [
          {
            "label": "کمیت‌نماها",
            "chips": [
              {
                "role": "aux",
                "text": "many / a few"
              },
              {
                "role": "obj",
                "text": "+ اسم جمع (books)"
              },
              {
                "role": "sig",
                "text": "|"
              },
              {
                "role": "aux",
                "text": "much / a little"
              },
              {
                "role": "obj",
                "text": "+ غیرقابل‌شمارش (time)"
              }
            ],
            "exampleEn": "She gave me a few good books and a little useful advice.",
            "exampleFa": "او چند کتاب خوب و کمی نصیحت مفید به من داد.",
            "learnerGlossFa": "برای اسم جمع از many یا a few و برای اسم غیرقابل‌شمارش از much یا a little استفاده کن."
          },
          {
            "label": "واحد شمارش",
            "chips": [
              {
                "role": "subj",
                "text": "We bought"
              },
              {
                "role": "aux",
                "text": "two loaves of"
              },
              {
                "role": "obj",
                "text": "fresh bread."
              }
            ],
            "exampleEn": "She gave me two pieces of useful advice.",
            "exampleFa": "او دو توصیهٔ مفید به من کرد.",
            "learnerGlossFa": "ما دو قرص نان تازه خریدیم."
          },
          {
            "label": "See Also (کتاب ص ۳۳): Numbers",
            "chips": [
              {
                "role": "sig",
                "text": "two hundred"
              },
              {
                "role": "subj",
                "text": "Canadian"
              },
              {
                "role": "obj",
                "text": "dollars"
              }
            ],
            "exampleEn": "About one billion people learn English. We planted ninety-nine beautiful trees.",
            "exampleFa": "حدود یک میلیارد نفر انگلیسی یاد می‌گیرند. ما نود و نه درخت زیبا کاشتیم.",
            "learnerGlossFa": "دویست دلار کانادا."
          }
        ],
        "signals": [
          "many / a few + Plural",
          "much / a little + Uncountable",
          "a loaf / slice / piece / bottle of",
          "information / advice / news + فعل مفرد!",
          "two hundred / one billion (بدون s)"
        ],
        "traps": [
          {
            "wrong": "My grandfather gave me many good advices.",
            "right": "My grandfather gave me a lot of good advice / many pieces of advice.",
            "noteFa": "«advice» در این معنا غیرقابل‌شمارش است؛ به جای «many advices» می‌توان «a lot of advice» یا «many pieces of advice» گفت. برخی اسم‌های مشابه در معناهای دیگر قابل‌شمارش‌اند."
          },
          {
            "wrong": "How many money do you have?",
            "right": "How much money do you have?",
            "noteFa": "«money» غیرقابل‌شمارش است (تومان و دلار قابل‌شمارش‌اند، اما خود واژه money با How much می‌آید!)."
          }
        ],
        "timelineType": "scale_compare",
        "timelineCaptionFa": "دوگانگی شمارش‌پذیری اسم‌ها و انتخاب دقیق کمیت‌نما و واحد شمارش",
        "contextDialogue": {
          "lineA": "How much information did you find for our cultural project?",
          "faA": "چه مقدار اطلاعات برای پروژه فرهنگی‌مان پیدا کردی؟",
          "lineB": "I found a lot of useful information and bought a few books too.",
          "faB": "اطلاعات مفید زیادی پیدا کردم و چند جلد کتاب هم خریدم."
        },
        "guidedDiscovery": {
          "questionFa": "چرا با واژه «information» از «How much» استفاده شد در حالی که در فارسی می‌گوییم «اطلاعات» (جمع)؟",
          "options": [
            "چون «information» در این معنا غیرقابل‌شمارش است و معمولاً فعل مفرد می‌گیرد.",
            "چون بعدش did آمده است",
            "می‌توان How many هم به کار برد"
          ],
          "correctIdx": 0,
          "insightFa": "در معنای غیرقابل‌شمارش، اسم‌هایی مانند «information»، «advice»، «news»، «luggage» و «furniture» معمولاً فعل مفرد و «much / a little» می‌گیرند."
        },
        "threeD": {
          "formFa": "many / a few + جمع | much / a little + غیرقابل‌شمارش | a loaf/piece/bar/slice of | Writing: S + V + O",
          "meaningFa": "بیان دقیق مقدار و تعداد پدیده‌ها با واحدهای سنجش استاندارد انگلیسی",
          "useFa": "جلوگیری از خطای رایج جمع بستن advice/information و رعایت نظم فاعل + فعل در جملات ساده نگارشی"
        },
        "learnerGuide": {
          "explainFa": "اسم قابل‌شمارش را می‌توان به صورت مفرد یا جمع شمرد؛ اسم غیرقابل‌شمارش در آن معنا معمولاً به شکل مفرد و بدون a یا an می‌آید. برای جمع قابل‌شمارش many یا a few و برای غیرقابل‌شمارش much یا a little مناسب است. با یک واحد مانند a piece of می‌توان مقدار برخی اسم‌های غیرقابل‌شمارش را بیان کرد.",
          "examples": [
            {
              "en": "I have a few books.",
              "fa": "من چند کتاب دارم."
            },
            {
              "en": "She gave me a piece of advice.",
              "fa": "او یک توصیه به من کرد."
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: A Healthy Lifestyle",
        "titleFa": "درس ۲: زمان حال کامل (Present Perfect) + اسم مصدر (Gerunds)",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "حال کامل (have/has + P.P.) برای کاری است که از گذشته آغاز شده و تا کنون ادامه دارد (با since + مبدأ زمان یا for + طول مدت) یا در زمانی نامشخص در گذشته رخ داده و اثرش باقی است. در بخش Writing، اسم مصدر (فعل + ing) در سه جایگاه می‌آید: ۱) فاعل جمله (با فعل مفرد!)، ۲) بعد از حروف اضافه (in, on, of, for, by, without, instead of)، ۳) بعد از افعالی مثل enjoy, avoid, mind, finish, keep, suggest, imagine.",
        "formulas": [
          {
            "label": "حال کامل (since/for)",
            "chips": [
              {
                "role": "subj",
                "text": "Dr. Gharib's name"
              },
              {
                "role": "aux",
                "text": "has stayed"
              },
              {
                "role": "obj",
                "text": "alive"
              },
              {
                "role": "sig",
                "text": "for many years."
              }
            ],
            "exampleEn": "I haven't eaten junk food since Tir.",
            "exampleFa": "از تیرماه تاکنون هله‌هوله نخورده‌ام.",
            "learnerGlossFa": "نام دکتر قریب سال‌های زیادی زنده مانده است."
          },
          {
            "label": "اسم مصدر (Gerund)",
            "chips": [
              {
                "role": "verb",
                "text": "Walking"
              },
              {
                "role": "obj",
                "text": "every day"
              },
              {
                "role": "aux",
                "text": "keeps"
              },
              {
                "role": "obj",
                "text": "your heart strong."
              }
            ],
            "exampleEn": "Doctors advise avoiding sugary drinks.",
            "exampleFa": "پزشکان پرهیز از نوشیدنی‌های قندی را توصیه می‌کنند.",
            "learnerGlossFa": "پیاده‌روی روزانه قلب را قوی نگه می‌دارد."
          },
          {
            "label": "See Also (کتاب ص ۶۸): Phrasal Verbs",
            "chips": [
              {
                "role": "verb",
                "text": "give"
              },
              {
                "role": "sig",
                "text": "up"
              },
              {
                "role": "obj",
                "text": "smoking"
              }
            ],
            "exampleEn": "Has your father given up smoking? Turn off the washing machine.",
            "exampleFa": "آیا پدرت سیگار را ترک کرده است؟ ماشین لباسشویی را خاموش کن.",
            "learnerGlossFa": "سیگار کشیدن را ترک کردن."
          }
        ],
        "signals": [
          "since + مبدأ (2018 / Monday)",
          "for + مدت (ten years / a long time)",
          "already / yet / just / ever / never / recently / so far",
          "enjoy / avoid / mind / finish + V-ing",
          "give up / turn off / wake up"
        ],
        "traps": [
          {
            "wrong": "Eating fruits and vegetables are good for health.",
            "right": "Eating fruits and vegetables is good for health.",
            "noteFa": "وقتی فاعل جمله یک اسم مصدر (Eating ...) است، حتی اگر بعدش اسم جمع بیاید، فعل جمله حتماً مفرد (is) است!"
          },
          {
            "wrong": "We have lived here since five years.",
            "right": "We have lived here for five years.",
            "noteFa": "برای طول مدت (five years, two months, a long time) از «for» استفاده می‌کنیم، نه «since»!"
          }
        ],
        "timelineType": "present_perfect_bridge",
        "timelineCaptionFa": "پل زمان حال کامل: آغاز از گذشته (since مبدأ / for مدت) و امتداد اثر آن تا لحظه حال",
        "contextDialogue": {
          "lineA": "How long has Dr. Gharib's hospital served sick children?",
          "faA": "بیمارستان دکتر قریب چه مدت به کودکان بیمار خدمت کرده است؟",
          "lineB": "It has helped thousands of patients for decades, and walking daily keeps us healthy too.",
          "faB": "دهه‌هاست که به هزاران بیمار کمک کرده است؛ و پیاده‌روی روزانه نیز ما را سالم نگه می‌دارد."
        },
        "guidedDiscovery": {
          "questionFa": "چرا در عبارت «walking daily keeps us healthy»، فعل «keeps» مفرد (دارای -s) آمده است؟",
          "options": [
            "چون فاعل جمله یک اسم مصدر (Gerund = V-ing) است و اسم مصدر همیشه حکم مفرد دارد!",
            "چون daily مفرد است",
            "چون us جمع است"
          ],
          "correctIdx": 0,
          "insightFa": "ترکیب درخشان درس ۲ یازدهم! هرگاه عبارت «V-ing» فاعل جمله باشد (حتی Eating fruits and vegetables)، فعل جمله مفرد است!"
        },
        "threeD": {
          "formFa": "have / has + P.P. (since + مبدأ / for + مدت) | Writing: Gerund (V-ing) در نقش فاعل، بعد از حرف اضافه و enjoy/avoid/mind",
          "meaningFa": "پیوند گذشته به اکنون (تجربه تا امروز یا تداوم عمل) + ساخت اسم از فعل با -ing",
          "useFa": "برای یک رویداد پایان‌یافته با زمان مشخص گذشته، مانند «yesterday»، «two months ago» یا «last week»، در همان جمله معمولاً گذشتهٔ ساده به کار می‌رود."
        },
        "learnerGuide": {
          "explainFa": "حال کامل از have یا has و شکل سوم فعل ساخته می‌شود. Since نقطهٔ آغاز و for طول مدت را بیان می‌کند. شکل ing گاهی نقش اسم مصدر دارد؛ مثلاً می‌تواند فاعل جمله یا پس از حرف اضافه بیاید.",
          "examples": [
            {
              "en": "She has lived here for three years.",
              "fa": "او سه سال است که اینجا زندگی می‌کند."
            },
            {
              "en": "Swimming is good exercise.",
              "fa": "شنا ورزش خوبی است."
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: Art and Culture",
        "titleFa": "درس ۳: جملات شرطی نوع اول (Conditional Type 1) + مصدر با to (Infinitives)",
        "categoryFa": "گرامر + نگارش",
        "summaryFa": "در الگوی رایج شرطی نوع اول، جمله‌وارهٔ «if» با حال ساده و نتیجه با «will + فعل ساده» یا فعل وجهی مناسب می‌آید، حتی وقتی منظور آینده است. کاربردهای ویژهٔ «will» پس از «if» هم وجود دارد، اما الگوی پایه این نیست. مصدر «to + فعل ساده» می‌تواند پس از فعل‌هایی مانند «want»، «decide» و «hope» یا برای بیان هدف بیاید؛ پس از «enjoy»، «mind» و «avoid» معمولاً «V-ing» می‌آید.",
        "formulas": [
          {
            "label": "شرطی نوع اول",
            "chips": [
              {
                "role": "sig",
                "text": "If"
              },
              {
                "role": "subj",
                "text": "we"
              },
              {
                "role": "verb",
                "text": "respect"
              },
              {
                "role": "obj",
                "text": "elders,"
              },
              {
                "role": "aux",
                "text": "society will stay"
              },
              {
                "role": "obj",
                "text": "strong."
              }
            ],
            "exampleEn": "She won't catch the train if she doesn't hurry.",
            "exampleFa": "اگر عجله نکند، به قطار نخواهد رسید.",
            "learnerGlossFa": "اگر ما به بزرگ‌ترها احترام بگذاریم، جامعه استوار خواهد ماند."
          },
          {
            "label": "مصدر با to",
            "chips": [
              {
                "role": "subj",
                "text": "They"
              },
              {
                "role": "verb",
                "text": "decided"
              },
              {
                "role": "aux",
                "text": "to visit"
              },
              {
                "role": "obj",
                "text": "the handicraft bazaar."
              }
            ],
            "exampleEn": "It is important to preserve our mother tongue.",
            "exampleFa": "حفظ زبان مادری‌مان مهم است.",
            "learnerGlossFa": "آن‌ها تصمیم گرفتند از بازار صنایع‌دستی دیدن کنند."
          },
          {
            "label": "See Also (کتاب ص ۹۸): Past Participles",
            "chips": [
              {
                "role": "subj",
                "text": "Amir"
              },
              {
                "role": "aux",
                "text": "is"
              },
              {
                "role": "sig",
                "text": "bored"
              },
              {
                "role": "obj",
                "text": "with his job."
              }
            ],
            "exampleEn": "I'm so excited that we're going to Yazd. They were surprised at the news.",
            "exampleFa": "خیلی هیجان‌زده‌ام که به یزد می‌رویم. آن‌ها از این خبر شگفت‌زده شدند.",
            "learnerGlossFa": "امیر از شغلش خسته شده است."
          }
        ],
        "signals": [
          "If + Simple Present → will + V",
          "unless (= if ... not)",
          "decide / hope / plan / promise / agree + to V",
          "adj + to V",
          "bored / excited / surprised (-ed)"
        ],
        "traps": [
          {
            "wrong": "If it will rain tomorrow, we will stay home.",
            "right": "If it rains tomorrow, we will stay home.",
            "noteFa": "برای پیش‌بینی معمول باران در شرطی نوع اول، در بخش «if» حال سادهٔ «rains» می‌آوریم. «will» در برخی کاربردهای ویژه پس از «if» ممکن است، نه در این الگوی پایه."
          },
          {
            "wrong": "My brother enjoys to collect old coins.",
            "right": "My brother enjoys collecting old coins. / wants to collect...",
            "noteFa": "تفکیک طلایی یازدهم: بعد از «enjoy / mind / avoid / finish» شکل «V-ing» و بعد از «want / decide / hope / plan» شکل «to + V» می‌آید."
          }
        ],
        "timelineType": "conditional_branch",
        "timelineCaptionFa": "دوراهی شرط واقعی در آینده (If + حال ساده ➔ will/can/may + فعل ساده)",
        "contextDialogue": {
          "lineA": "If we protect our ancient handicrafts, tourists will buy them eagerly.",
          "faA": "اگر از صنایع‌دستی کهنمان محافظت کنیم، گردشگران با اشتیاق آن‌ها را خواهند خرید.",
          "lineB": "Exactly! Our city council has decided to open a new museum next spring.",
          "faB": "دقیقاً! شورای شهر ما تصمیم گرفته است بهار آینده موزه جدیدی افتتاح کند."
        },
        "guidedDiscovery": {
          "questionFa": "با اینکه هر دو بخش جمله اول مربوط به «آینده» است، چرا نگفتیم «If we will protect»؟",
          "options": [
            "چون در الگوی رایج شرطی نوع اول، برای شرط آینده از حال ساده و برای نتیجه معمولاً از «will» استفاده می‌کنیم.",
            "چون tourists جمع است",
            "چون protect فعل بی‌قاعده است"
          ],
          "correctIdx": 0,
          "insightFa": "در شرطی نوع اول معمولاً بخش «if» حال ساده و بخش نتیجه «will» دارد. کاربردهای ویژهٔ «will» پس از «if» نیز وجود دارند، اما در این الگوی پایه معمول نیستند."
        },
        "threeD": {
          "formFa": "If / unless + Simple Present , Subj + will/can/may/must + V | Writing: Infinitive (to + V) بعد از want/decide/plan/adj",
          "meaningFa": "پیش‌بینی نتیجه محتمل و واقعی یک شرط در آینده + بیان قصد و هدف با مصدر با to",
          "useFa": "توجه ویژه به منفی بودن ذاتی unless (= if...not) و تفکیک افعال to-دار (decide/hope/promise) از افعال ing-دار (enjoy/avoid)"
        },
        "learnerGuide": {
          "explainFa": "در الگوی رایج شرطی نوع اول، بخش if با حال ساده و نتیجه با will یا فعل وجهی مناسب ساخته می‌شود؛ حتی وقتی منظور آینده است. مصدر با to پس از بعضی فعل‌ها مانند decide و نیز برای بیان هدف به کار می‌رود. کاربردهای ویژهٔ will پس از if وجود دارند، اما در این الگوی پایه معمول نیستند.",
          "examples": [
            {
              "en": "If it rains, we will stay home.",
              "fa": "اگر باران ببارد، در خانه می‌مانیم."
            },
            {
              "en": "They decided to visit the bazaar.",
              "fa": "آن‌ها تصمیم گرفتند از بازار دیدن کنند."
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "v2_l1_1",
        "lesson": 1,
        "ruleTag": "غیرقابل‌شمارش بودن advice",
        "sentence": "Our wise teacher gave us a lot of useful advice before the national exam.",
        "target": "advice",
        "cloze": "Our wise teacher gave us a lot of useful _____ before the national exam.",
        "promptHint": "uncountable noun",
        "options": [
          "advice",
          "advices",
          "an advice",
          "many advice"
        ],
        "fa": "دبیر دانای ما پیش از آزمون سراسری نصیحت‌های مفید فراوانی به ما کرد.",
        "explainFa": "واژه «advice» غیرقابل‌شمارش است؛ نه «s» می‌گیرد، نه «an» و نه «many»!",
        "chunks": [
          "Our wise teacher gave",
          "us a lot of useful",
          "advices",
          "before the national exam."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "advice",
        "flawedSentence": "Our wise teacher gave us a lot of useful advices before the national exam.",
        "matchLeft": "advice / information",
        "matchRight": "غیرقابل‌شمارش (بدون s)",
        "noTyping": true
      },
      {
        "id": "v2_l1_2",
        "lesson": 1,
        "ruleTag": "تطابق فعل مفرد با information",
        "sentence": "All the information on these historical tablets is very valuable.",
        "target": "is",
        "cloze": "All the information on these historical tablets _____ very valuable.",
        "promptHint": "singular verb",
        "options": [
          "is",
          "are",
          "were",
          "be"
        ],
        "fa": "تمام اطلاعات روی این لوح‌های تاریخی بسیار ارزشمند است.",
        "explainFa": "هسته فاعل «information» غیرقابل‌شمارش است (فریب جمع بودن tablets را نخورید!)؛ پس فعل «is» مفرد می‌آید.",
        "chunks": [
          "All the information on",
          "these historical tablets",
          "are",
          "very valuable."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "All the information on these historical tablets are very valuable.",
        "matchLeft": "The information ___ true.",
        "matchRight": "is",
        "noTyping": true
      },
      {
        "id": "v2_l1_3",
        "lesson": 1,
        "ruleTag": "تفکیک a few و a little",
        "sentence": "Wait a moment! I need a little time and a few sheets of paper to write the plan.",
        "target": "a little",
        "cloze": "Wait a moment! I need _____ time and a few sheets of paper to write the plan.",
        "promptHint": "a little / a few",
        "options": [
          "a little",
          "a few",
          "many",
          "several"
        ],
        "fa": "یک لحظه صبر کن! به کمی زمان و چند برگ کاغذ برای نوشتن طرح نیاز دارم.",
        "explainFa": "چون «time» (در معنای زمان) غیرقابل‌شمارش است، «a little» می‌گیرد.",
        "chunks": [
          "Wait a moment! I need",
          "a few",
          "time and a few sheets of",
          "paper to write the plan."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "a little",
        "flawedSentence": "Wait a moment! I need a few time and a few sheets of paper to write the plan.",
        "matchLeft": "___ time / water",
        "matchRight": "a little"
      },
      {
        "id": "v2_l1_4",
        "lesson": 1,
        "ruleTag": "پرسش How much با money",
        "sentence": "How much money did the charity collect for building the rural school?",
        "target": "How much",
        "cloze": "_____ money did the charity collect for building the rural school?",
        "promptHint": "How much/many",
        "options": [
          "How much",
          "How many",
          "How much of",
          "Many"
        ],
        "fa": "خیریه چه مقدار پول برای ساخت مدرسه روستایی جمع‌آوری کرد؟",
        "explainFa": "واژه «money» غیرقابل‌شمارش است و با «How much» پرسیده می‌شود.",
        "chunks": [
          "How many",
          "money did the",
          "charity collect for building",
          "the rural school?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How much",
        "flawedSentence": "How many money did the charity collect for building the rural school?",
        "matchLeft": "___ money / bread?",
        "matchRight": "How much"
      },
      {
        "id": "v2_l1_5",
        "lesson": 1,
        "ruleTag": "واحد شمارش نان (loaves of)",
        "sentence": "My mother asked me to buy three loaves of fresh bread from the bakery.",
        "target": "loaves of",
        "cloze": "My mother asked me to buy three _____ fresh bread from the bakery.",
        "promptHint": "measure word",
        "options": [
          "loaves of",
          "bars of",
          "bottles of",
          "drops of"
        ],
        "fa": "مادرم از من خواست سه قرص نان تازه از نانوایی بخرم.",
        "explainFa": "واحد شمارش استاندارد برای «bread» واژه «a loaf of / loaves of» (یا slices of) است.",
        "chunks": [
          "My mother asked me",
          "to buy three",
          "bars of",
          "fresh bread from the bakery."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "loaves of",
        "flawedSentence": "My mother asked me to buy three bars of fresh bread from the bakery.",
        "matchLeft": "واحد شمارش bread",
        "matchRight": "a loaf of bread",
        "noTyping": true
      },
      {
        "id": "v2_l1_6",
        "lesson": 1,
        "ruleTag": "کمیت‌نمای many با جمع بی‌قاعده",
        "sentence": "How many people attended the cultural ceremony in Mashhad?",
        "target": "How many",
        "cloze": "_____ people attended the cultural ceremony in Mashhad?",
        "promptHint": "people = plural",
        "options": [
          "How many",
          "How much",
          "How many of",
          "Much"
        ],
        "fa": "چند نفر در آن آیین فرهنگی در مشهد شرکت کردند؟",
        "explainFa": "واژه «people» اسم جمع بی‌قاعده است؛ بنابراین «How many» می‌گیرد.",
        "chunks": [
          "How much",
          "people attended",
          "the cultural ceremony",
          "in Mashhad?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "How many",
        "flawedSentence": "How much people attended the cultural ceremony in Mashhad?",
        "matchLeft": "___ people / children?",
        "matchRight": "How many",
        "noTyping": true
      },
      {
        "id": "v2_l1_7",
        "lesson": 1,
        "ruleTag": "Writing: ساختار جمله ساده S + V + O",
        "sentence": "Kindness builds strong bridges between different nations.",
        "target": "Kindness builds",
        "cloze": "_____ strong bridges between different nations.",
        "promptHint": "S + V order",
        "options": [
          "Kindness builds",
          "Builds kindness",
          "Kindness build",
          "Kindness is build"
        ],
        "fa": "مهربانی پل‌های استواری میان ملت‌های گوناگون می‌سازد.",
        "explainFa": "هر جمله ساده انگلیسی باید با فاعل (Kindness — مفرد) و سپس فعل منطبق با آن (builds) آغاز شود.",
        "chunks": [
          "Builds kindness",
          "strong bridges",
          "between",
          "different nations."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Kindness builds",
        "flawedSentence": "Builds kindness strong bridges between different nations.",
        "matchLeft": "ساختار پایه جمله ساده",
        "matchRight": "Subject + Verb (+ Object)",
        "noTyping": true
      },
      {
        "id": "v2_l1_8",
        "lesson": 1,
        "ruleTag": "واحد شمارش صابون و شکلات (bars of)",
        "sentence": "She put two bars of soap and a tube of toothpaste in her travel bag.",
        "target": "bars of",
        "cloze": "She put two _____ soap and a tube of toothpaste in her travel bag.",
        "promptHint": "measure word",
        "options": [
          "bars of",
          "loaves of",
          "slices of",
          "glasses of"
        ],
        "fa": "او دو قالب صابون و یک تیوب خمیردندان در کیف سفرش گذاشت.",
        "explainFa": "واحد شمارش استاندارد برای صابون (soap) و شکلات تخته‌ای (chocolate) عبارت «a bar of / bars of» است.",
        "chunks": [
          "She put two",
          "loaves of",
          "soap and a tube of",
          "toothpaste in her travel bag."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "bars of",
        "flawedSentence": "She put two loaves of soap and a tube of toothpaste in her travel bag.",
        "matchLeft": "واحد شمارش soap / gold",
        "matchRight": "a bar of",
        "noTyping": true
      },
      {
        "id": "v2_l1_9",
        "lesson": 1,
        "ruleTag": "غیرقابل‌شمارش بودن news با فعل مفرد",
        "sentence": "Good news makes everyone hopeful and energetic.",
        "target": "makes",
        "cloze": "Good news _____ everyone hopeful and energetic.",
        "promptHint": "news = singular!",
        "options": [
          "makes",
          "make",
          "are making",
          "have made"
        ],
        "fa": "خبر خوب همه را امیدوار و پرانرژی می‌کند.",
        "explainFa": "واژه «news» با وجود داشتن «s» در انتها، کاملاً غیرقابل‌شمارش و مفرد است و فعل مفرد «makes» می‌گیرد!",
        "chunks": [
          "Good news",
          "make",
          "everyone hopeful",
          "and energetic."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "makes",
        "flawedSentence": "Good news make everyone hopeful and energetic.",
        "matchLeft": "The news ___ good.",
        "matchRight": "is / makes (مفرد!)",
        "noTyping": true
      },
      {
        "id": "v2_l2_1",
        "lesson": 2,
        "ruleTag": "حال کامل با since",
        "sentence": "Mr. Taghizadeh has taught English in high schools since 2019.",
        "target": "has taught",
        "cloze": "Mr. Taghizadeh _____ English in high schools since 2019.",
        "promptHint": "present perfect",
        "options": [
          "has taught",
          "taught",
          "teaches",
          "have taught"
        ],
        "fa": "آقای تقی‌زاده از سال ۲۰۱۹ تاکنون در دبیرستان‌ها زبان انگلیسی تدریس کرده است.",
        "explainFa": "وجود «since + مبدأ زمانی (2019)» نشانه قطعی زمان حال کامل «has taught» است.",
        "chunks": [
          "Mr. Taghizadeh",
          "taught",
          "English in high",
          "schools since 2019."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has taught",
        "flawedSentence": "Mr. Taghizadeh taught English in high schools since 2019.",
        "matchLeft": "since 2019",
        "matchRight": "have/has + P.P.",
        "noTyping": true
      },
      {
        "id": "v2_l2_2",
        "lesson": 2,
        "ruleTag": "تفکیک since و for",
        "sentence": "My grandmother hasn't eaten salty or fatty food for three years.",
        "target": "for",
        "cloze": "My grandmother hasn't eaten salty or fatty food _____ three years.",
        "promptHint": "since vs for",
        "options": [
          "for",
          "since",
          "ago",
          "during"
        ],
        "fa": "مادربزرگم به مدت سه سال غذای شور یا چرب نخورده است.",
        "explainFa": "چون «three years» طول مدت زمان است (نه مبدأ)، حرف اضافه «for» به کار می‌رود.",
        "chunks": [
          "My grandmother hasn't eaten",
          "salty or fatty food",
          "since",
          "three years."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "for",
        "flawedSentence": "My grandmother hasn't eaten salty or fatty food since three years.",
        "matchLeft": "___ ten years (مدت)",
        "matchRight": "for",
        "altAnswers": [
          "in"
        ]
      },
      {
        "id": "v2_l2_3",
        "lesson": 2,
        "ruleTag": "تفاوت حال کامل و گذشته ساده با ago",
        "sentence": "Scientists discovered a new treatment for heart disease two months ago.",
        "target": "discovered",
        "cloze": "Scientists _____ a new treatment for heart disease two months ago.",
        "promptHint": "ago → past simple",
        "options": [
          "discovered",
          "have discovered",
          "has discovered",
          "discover"
        ],
        "fa": "دانشمندان دو ماه پیش درمان جدیدی برای بیماری قلبی کشف کردند.",
        "explainFa": "«two months ago» زمان پایان‌یافتهٔ این رویداد را مشخص می‌کند، پس گذشتهٔ سادهٔ «discovered» در این جمله مناسب است.",
        "chunks": [
          "Scientists",
          "have discovered",
          "a new treatment for",
          "heart disease two months ago."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "discovered",
        "flawedSentence": "Scientists have discovered a new treatment for heart disease two months ago.",
        "matchLeft": "two days ago",
        "matchRight": "گذشته ساده (نه حال کامل!)",
        "noTyping": true
      },
      {
        "id": "v2_l2_4",
        "lesson": 2,
        "ruleTag": "کاربرد yet در منفی و سؤالی",
        "sentence": "Have you checked your blood pressure with the doctor yet?",
        "target": "yet",
        "cloze": "Have you checked your blood pressure with the doctor _____?",
        "promptHint": "yet / already",
        "options": [
          "yet",
          "ago",
          "since",
          "for"
        ],
        "fa": "آیا هنوز فشار خونت را نزد پزشک بررسی کرده‌ای؟",
        "explainFa": "در پایان جملات سؤالی و منفی حال کامل به معنای «هنوز / تا این لحظه» قید «yet» می‌آید.",
        "chunks": [
          "Have you checked",
          "your blood pressure",
          "with the doctor",
          "ago?"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "yet?",
        "flawedSentence": "Have you checked your blood pressure with the doctor ago?",
        "matchLeft": "پایان منفی/سؤالی حال کامل",
        "matchRight": "yet"
      },
      {
        "id": "v2_l2_5",
        "lesson": 2,
        "ruleTag": "Writing: اسم مصدر در نقش فاعل + فعل مفرد",
        "sentence": "Doing regular physical exercise reduces emotional stress significantly.",
        "target": "reduces",
        "cloze": "Doing regular physical exercise _____ emotional stress significantly.",
        "promptHint": "Gerund + singular V",
        "options": [
          "reduces",
          "reduce",
          "are reducing",
          "have reduced"
        ],
        "fa": "انجام دادن ورزش منظم بدنی، استرس عاطفی را به‌طور چشمگیری کاهش می‌دهد.",
        "explainFa": "وقتی فاعل جمله یک عبارت مصدری با «-ing» (Doing ...) است، فعل جمله همیشه مفرد (reduces) می‌آید!",
        "chunks": [
          "Doing regular",
          "physical exercise",
          "reduce",
          "emotional stress significantly."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "reduces",
        "flawedSentence": "Doing regular physical exercise reduce emotional stress significantly.",
        "matchLeft": "V-ing (فاعل) + ___",
        "matchRight": "فعل مفرد (is / reduces)",
        "noTyping": true
      },
      {
        "id": "v2_l2_6",
        "lesson": 2,
        "ruleTag": "Writing: اسم مصدر بعد از حرف اضافه",
        "sentence": "You can improve your listening skill by watching short English videos.",
        "target": "watching",
        "cloze": "You can improve your listening skill by _____ short English videos.",
        "promptHint": "prep + V-ing",
        "options": [
          "watching",
          "watch",
          "to watch",
          "watched"
        ],
        "fa": "می‌توانید مهارت شنیداری خود را با تماشای ویدیوهای کوتاه انگلیسی تقویت کنید.",
        "explainFa": "پس از تمام حروف اضافه (by, without, in, of, instead of) فعل حتماً «-ing» می‌گیرد.",
        "chunks": [
          "You can improve your",
          "listening skill by",
          "watch",
          "short English videos."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "watching",
        "flawedSentence": "You can improve your listening skill by watch short English videos.",
        "matchLeft": "by / without / of + ___",
        "matchRight": "V-ing",
        "noTyping": true
      },
      {
        "id": "v2_l2_7",
        "lesson": 2,
        "ruleTag": "Writing: اسم مصدر بعد از avoid / suggest",
        "sentence": "Nutritionists strongly advise avoiding junk food and soda.",
        "target": "avoiding",
        "cloze": "Nutritionists strongly advise _____ junk food and soda.",
        "promptHint": "advise/avoid + V-ing",
        "options": [
          "avoiding",
          "to avoid",
          "avoid",
          "avoided"
        ],
        "fa": "متخصصان تغذیه اکیداً پرهیز از هله‌هوله و نوشابه را توصیه می‌کنند.",
        "explainFa": "بعد از فعل «advise» (بدون مفعول شخص) و همچنین بعد از خود «avoid»، فعل به صورت اسم مصدر (V-ing = avoiding) می‌آید.",
        "chunks": [
          "Nutritionists strongly advise",
          "to avoid",
          "junk food",
          "and soda."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "avoiding",
        "flawedSentence": "Nutritionists strongly advise to avoid junk food and soda.",
        "matchLeft": "avoid / suggest / mind +",
        "matchRight": "V-ing",
        "noTyping": true
      },
      {
        "id": "v2_l2_8",
        "lesson": 2,
        "ruleTag": "حال کامل با ever در پرسش",
        "sentence": "Have you ever climbed Mount Sabalan in summer?",
        "target": "ever climbed",
        "cloze": "Have you _____ Mount Sabalan in summer?",
        "promptHint": "Have you ever + P.P.",
        "options": [
          "ever climbed",
          "ever climb",
          "climbed ever",
          "ever climbing"
        ],
        "fa": "آیا تا به حال در تابستان به کوه سبلان صعود کرده‌ای؟",
        "explainFa": "الگوی پرسش از تجربه زندگی تا امروز: «Have/Has + فاعل + ever + اسم مفعول (P.P)»",
        "chunks": [
          "Have you",
          "ever climb",
          "Mount Sabalan",
          "in summer?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "ever climbed",
        "flawedSentence": "Have you ever climb Mount Sabalan in summer?",
        "matchLeft": "Have you ever + ___?",
        "matchRight": "P.P. (اسم مفعول)"
      },
      {
        "id": "v2_l2_9",
        "lesson": 2,
        "ruleTag": "Writing: عبارت look forward to + V-ing",
        "sentence": "All the students are looking forward to hearing their exam results.",
        "target": "hearing",
        "cloze": "All the students are looking forward to _____ their exam results.",
        "promptHint": "look forward to + ing",
        "options": [
          "hearing",
          "hear",
          "heard",
          "hears"
        ],
        "fa": "همه دانش‌آموزان مشتاقانه منتظر شنیدن نتایج امتحاناتشان هستند.",
        "explainFa": "نکته طلایی کنکور و نهایی: در «look forward to» و «be used to»، واژه «to» حرف اضافه است و بعدش «V-ing» می‌آید!",
        "chunks": [
          "All the students are",
          "looking forward to",
          "hear",
          "their exam results."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "hearing",
        "flawedSentence": "All the students are looking forward to hear their exam results.",
        "matchLeft": "look forward to + ___",
        "matchRight": "V-ing (نه فعل ساده!)",
        "noTyping": true
      },
      {
        "id": "v2_l3_1",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول — بخش شرط",
        "sentence": "If young people learn traditional arts, Iranian handicrafts will stay alive.",
        "target": "learn",
        "cloze": "If young people _____ traditional arts, Iranian handicrafts will stay alive.",
        "promptHint": "If + Simple Present",
        "options": [
          "learn",
          "will learn",
          "learned",
          "would learn"
        ],
        "fa": "اگر جوانان هنرهای سنتی را بیاموزند، صنایع‌دستی ایران زنده خواهد ماند.",
        "explainFa": "در الگوی رایج شرطی نوع اول، بخش شرط این جمله حال سادهٔ «learn» و نتیجه «will stay» دارد.",
        "chunks": [
          "If young people",
          "will learn",
          "traditional arts, Iranian handicrafts",
          "will stay alive."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "learn",
        "flawedSentence": "If young people will learn traditional arts, Iranian handicrafts will stay alive.",
        "matchLeft": "If + ___ , will + V",
        "matchRight": "حال ساده (بدون will)",
        "noTyping": true
      },
      {
        "id": "v2_l3_2",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول — سوم‌شخص مفرد",
        "sentence": "Reza won't pass the driving test if he is tired.",
        "target": "is",
        "cloze": "Reza won't pass the driving test if he _____ tired.",
        "promptHint": "present simple",
        "options": [
          "is",
          "will be",
          "are",
          "am"
        ],
        "fa": "اگر رضا خسته باشد، در آزمون رانندگی قبول نمی‌شود.",
        "explainFa": "در الگوی رایج شرطی نوع اول، شرط این جمله حال سادهٔ «if he is tired» دارد و «will» در نتیجه آمده است؛ کاربردهای ویژهٔ «will» پس از «if» نیز وجود دارند.",
        "chunks": [
          "Reza won't pass the",
          "driving test if he",
          "will be",
          "tired."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "Reza won't pass the driving test if he will be tired.",
        "matchLeft": "won't pass … if he ___ tired",
        "matchRight": "is",
        "noTyping": true
      },
      {
        "id": "v2_l3_3",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول — بخش نتیجه",
        "sentence": "If tourists visit Yazd in spring, they can see unique windcatchers.",
        "target": "can see",
        "cloze": "If tourists visit Yazd in spring, they _____ unique windcatchers.",
        "promptHint": "result clause",
        "options": [
          "can see",
          "saw",
          "could saw",
          "would saw"
        ],
        "fa": "اگر گردشگران در بهار از یزد دیدن کنند، می‌توانند بادگیرهای بی‌نظیری ببینند.",
        "explainFa": "در بخش نتیجه شرطی نوع اول علاوه بر «will»، افعال «can / may / must + شکل ساده فعل» نیز به کار می‌روند.",
        "chunks": [
          "If tourists visit Yazd",
          "in spring, they",
          "saw",
          "unique windcatchers."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "can see",
        "flawedSentence": "If tourists visit Yazd in spring, they saw unique windcatchers.",
        "matchLeft": "نتیجه شرطی نوع اول",
        "matchRight": "will / can / may + V",
        "noTyping": true
      },
      {
        "id": "v2_l3_4",
        "lesson": 3,
        "ruleTag": "Writing: مصدر با to پس از decide / plan",
        "sentence": "The municipality has decided to restore the ancient bazaar next month.",
        "target": "to restore",
        "cloze": "The municipality has decided _____ the ancient bazaar next month.",
        "promptHint": "decide + to V",
        "options": [
          "to restore",
          "restoring",
          "restore",
          "restored"
        ],
        "fa": "شهرداری تصمیم گرفته است ماه آینده بازار باستانی را مرمت کند.",
        "explainFa": "پس از افعال «decide, plan, hope, promise, want, agree» مصدر با «to» می‌آید.",
        "chunks": [
          "The municipality has decided",
          "restoring",
          "the ancient",
          "bazaar next month."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "to restore",
        "flawedSentence": "The municipality has decided restoring the ancient bazaar next month.",
        "matchLeft": "decide / plan / promise +",
        "matchRight": "to + فعل ساده"
      },
      {
        "id": "v2_l3_5",
        "lesson": 3,
        "ruleTag": "Writing: مصدر با to پس از صفت",
        "sentence": "It is necessary for every citizen to respect cultural diversity.",
        "target": "to respect",
        "cloze": "It is necessary for every citizen _____ cultural diversity.",
        "promptHint": "It is + adj + to V",
        "options": [
          "to respect",
          "respecting",
          "respect",
          "respected"
        ],
        "fa": "برای هر شهروندی احترام گذاشتن به تنوع فرهنگی ضروری است.",
        "explainFa": "در الگوی «It is + صفت (+ for someone) + to V»، بعد از صفت حتماً مصدر با «to» می‌آید.",
        "chunks": [
          "It is necessary",
          "for every citizen",
          "respecting",
          "cultural diversity."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "to respect",
        "flawedSentence": "It is necessary for every citizen respecting cultural diversity.",
        "matchLeft": "It is easy / hard + ___",
        "matchRight": "to + V"
      },
      {
        "id": "v2_l3_6",
        "lesson": 3,
        "ruleTag": "Writing: مصدر هدف (to = in order to)",
        "sentence": "Many tourists travel to Isfahan to visit Naqsh-e Jahan Square.",
        "target": "to visit",
        "cloze": "Many tourists travel to Isfahan _____ Naqsh-e Jahan Square.",
        "promptHint": "infinitive of purpose",
        "options": [
          "to visit",
          "for visit",
          "for visiting",
          "visited"
        ],
        "fa": "بسیاری از گردشگران به اصفهان سفر می‌کنند تا از میدان نقش جهان بازدید کنند.",
        "explainFa": "برای بیان «هدف از انجام کار» از مصدر با «to» استفاده می‌کنیم (هرگز «for visit» نگویید!).",
        "chunks": [
          "Many tourists",
          "travel to Isfahan",
          "for visit",
          "Naqsh-e Jahan Square."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "to visit",
        "flawedSentence": "Many tourists travel to Isfahan for visit Naqsh-e Jahan Square.",
        "matchLeft": "بیان هدف از کار",
        "matchRight": "to + V (نه for + V!)",
        "noTyping": true
      },
      {
        "id": "v2_l3_7",
        "lesson": 3,
        "ruleTag": "کاربرد unless در شرطی نوع اول",
        "sentence": "You won't master English grammar unless you practice it in real sentences.",
        "target": "practice",
        "cloze": "You won't master English grammar unless you _____ it in real sentences.",
        "promptHint": "unless = if not",
        "options": [
          "practice",
          "won't practice",
          "don't practice",
          "will practice"
        ],
        "fa": "بر گرامر انگلیسی مسلط نخواهی شد مگر آنکه آن را در جملات واقعی تمرین کنی.",
        "explainFa": "واژه «unless» یعنی «اگر ... نه» (خودش منفی است!)؛ پس فعل بعد از آن حال ساده مثبت (practice) و بدون will می‌آید.",
        "chunks": [
          "You won't master English",
          "grammar unless you",
          "don't practice",
          "it in real sentences."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "practice",
        "flawedSentence": "You won't master English grammar unless you don't practice it in real sentences.",
        "matchLeft": "unless + ___",
        "matchRight": "فعل مثبت حال ساده!",
        "noTyping": true
      },
      {
        "id": "v2_l3_8",
        "lesson": 3,
        "ruleTag": "Writing: مفعول + مصدر با to (ask / tell / advise + sb + to V)",
        "sentence": "The family doctor advised my grandfather to walk in the park every morning.",
        "target": "to walk",
        "cloze": "The family doctor advised my grandfather _____ in the park every morning.",
        "promptHint": "advise + sb + to V",
        "options": [
          "to walk",
          "walking",
          "walk",
          "walked"
        ],
        "fa": "پزشک خانواده به پدربزرگم توصیه کرد هر روز صبح در پارک پیاده‌روی کند.",
        "explainFa": "وقتی بعد از «advise, allow, ask, tell, want» مفعول (my grandfather) بیاید، حتماً مصدر با «to» به کار می‌رود!",
        "chunks": [
          "The family doctor",
          "advised my grandfather",
          "walk",
          "in the park every morning."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "to walk",
        "flawedSentence": "The family doctor advised my grandfather walk in the park every morning.",
        "matchLeft": "tell / ask + sb + ___",
        "matchRight": "(not) to + V"
      },
      {
        "id": "v2_l1_10",
        "lesson": 1,
        "ruleTag": "How much با آب",
        "sentence": "How much water do we need every day?",
        "target": "much",
        "cloze": "How _____ water do we need every day?",
        "promptHint": "much",
        "options": [
          "much",
          "many",
          "a lot of",
          "few"
        ],
        "fa": "ما هر روز به چه مقدار آب نیاز داریم؟",
        "explainFa": "«water» غیرقابل‌شمارش است و با «How much» می‌آید، نه «How many».",
        "chunks": [
          "How",
          "many",
          "water do we",
          "need every day?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "much",
        "flawedSentence": "How many water do we need every day?",
        "matchLeft": "How",
        "matchRight": "much water do we need",
        "noTyping": true
      },
      {
        "id": "v2_l1_11",
        "lesson": 1,
        "ruleTag": "فعل مفرد با luggage",
        "sentence": "The luggage is very heavy.",
        "target": "is",
        "cloze": "The luggage _____ very heavy.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "be",
          "were"
        ],
        "fa": "بار و اثاثیهٔ سفر خیلی سنگین است.",
        "explainFa": "«luggage» غیرقابل‌شمارش و مفرد است، پس فعل هم مفرد می‌آید.",
        "chunks": [
          "The",
          "luggage",
          "are",
          "very heavy."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "is",
        "flawedSentence": "The luggage are very heavy.",
        "matchLeft": "The luggage",
        "matchRight": "is very heavy",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "v2_l1_12",
        "lesson": 1,
        "ruleTag": "a little با زمان",
        "sentence": "I need a little more time to finish this project.",
        "target": "a little",
        "cloze": "I need _____ more time to finish this project.",
        "promptHint": "little",
        "options": [
          "a little",
          "a few",
          "many",
          "several"
        ],
        "fa": "برای تمام کردن این پروژه به کمی وقت بیشتر نیاز دارم.",
        "explainFa": "«time» غیرقابل‌شمارش است، پس «a little» به‌کار می‌رود نه «a few».",
        "chunks": [
          "I need",
          "a few",
          "more time to",
          "finish this project."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "a little",
        "flawedSentence": "I need a few more time to finish this project.",
        "matchLeft": "I need",
        "matchRight": "a little more time",
        "altAnswers": [
          "some"
        ],
        "informalAnswers": [
          {
            "f": "a bit",
            "n": "«a bit» محاوره‌ای است؛ در نوشتار رسمی «a little» می‌آید."
          }
        ]
      },
      {
        "id": "v2_l1_13",
        "lesson": 1,
        "ruleTag": "some با news",
        "sentence": "There is some news about the new library.",
        "target": "some",
        "cloze": "There is _____ news about the new library.",
        "promptHint": "some",
        "options": [
          "some",
          "many",
          "a few",
          "few"
        ],
        "fa": "دربارهٔ کتابخانهٔ جدید خبری هست.",
        "explainFa": "«news» غیرقابل‌شمارش است؛ بنابراین «many» به‌کار نمی‌رود.",
        "chunks": [
          "There is",
          "many",
          "news about the",
          "new library."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "some",
        "flawedSentence": "There is many news about the new library.",
        "matchLeft": "There is",
        "matchRight": "some news about the new library",
        "noTyping": true
      },
      {
        "id": "v2_l1_14",
        "lesson": 1,
        "ruleTag": "واحد سنجش piece of advice",
        "sentence": "She gave me a useful piece of advice.",
        "target": "a",
        "cloze": "She gave me _____ useful piece of advice.",
        "promptHint": "a",
        "options": [
          "a",
          "an",
          "many",
          "much"
        ],
        "fa": "او به من یک توصیهٔ مفید داد.",
        "explainFa": "«piece» با حرف تعریف «a» می‌آید و «advice» غیرقابل‌شمارش است.",
        "chunks": [
          "She gave me",
          "an",
          "useful piece",
          "of advice."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "a",
        "flawedSentence": "She gave me an useful piece of advice.",
        "matchLeft": "She gave me",
        "matchRight": "a useful piece of advice",
        "noTyping": true
      },
      {
        "id": "v2_l1_15",
        "lesson": 1,
        "ruleTag": "much با information",
        "sentence": "We need much more information before the decision.",
        "target": "much",
        "cloze": "We need _____ more information before the decision.",
        "promptHint": "much",
        "options": [
          "much",
          "many",
          "a few",
          "few"
        ],
        "fa": "ما پیش از تصمیم‌گیری به اطلاعات بسیار بیشتری نیاز داریم.",
        "explainFa": "«information» غیرقابل‌شمارش است و با «much» می‌آید.",
        "chunks": [
          "We need",
          "many",
          "more information before",
          "the decision."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "much",
        "flawedSentence": "We need many more information before the decision.",
        "matchLeft": "We need",
        "matchRight": "much more information",
        "noTyping": true
      },
      {
        "id": "v2_l1_16",
        "lesson": 1,
        "ruleTag": "کمیت: thousand بدون s بعد از عدد",
        "sentence": "More than two thousand people visited the museum last year.",
        "target": "thousand",
        "cloze": "More than two _____ people visited the museum last year.",
        "promptHint": "thousand",
        "options": [
          "thousand",
          "thousands",
          "thousand's",
          "thousands'"
        ],
        "fa": "سال گذشته بیش از دو هزار نفر از موزه بازدید کردند.",
        "explainFa": "کتاب (ص ۳۳): بعد از عدد، «hundred / thousand / million / billion» بدون s می‌آیند: «two thousand people».",
        "chunks": [
          "More than two",
          "thousands",
          "people visited the",
          "museum last year."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "thousand",
        "flawedSentence": "More than two thousands people visited the museum last year.",
        "matchLeft": "two ___ people",
        "matchRight": "thousand",
        "noTyping": true
      },
      {
        "id": "v2_l1_17",
        "lesson": 1,
        "ruleTag": "کمیت: billion بدون s و of",
        "sentence": "There are about one billion learners of English all around the world.",
        "target": "billion",
        "cloze": "There are about one _____ learners of English all around the world.",
        "promptHint": "billion",
        "options": [
          "billion",
          "billions",
          "billion's",
          "billions'"
        ],
        "fa": "حدود یک میلیارد زبان‌آموز انگلیسی در سراسر دنیا هست.",
        "explainFa": "کتاب (ص ۲۵ و ۳۳): «one billion learners»؛ بعد از عدد، «billion» بدون s و بدون of می‌آید.",
        "chunks": [
          "There are about one",
          "billions",
          "learners of English all",
          "around the world."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "billion",
        "flawedSentence": "There are about one billions learners of English all around the world.",
        "matchLeft": "about one ___ learners",
        "matchRight": "billion",
        "noTyping": true
      },
      {
        "id": "v2_l1_18",
        "lesson": 1,
        "ruleTag": "کمیت: اسم جمع بعد از عدد",
        "sentence": "My uncle changed two hundred Canadian dollars at the bank.",
        "target": "dollars",
        "cloze": "My uncle changed two hundred Canadian _____ at the bank.",
        "promptHint": "dollar",
        "options": [
          "dollars",
          "dollar",
          "dollar's",
          "dollars'"
        ],
        "fa": "عمویم در بانک دویست دلار کانادا تبدیل کرد.",
        "explainFa": "کتاب (ص ۳۳: «two hundred Canadian dollars»): عدد (hundred) s نمی‌گیرد ولی اسمِ بعد از آن جمع است: «dollars».",
        "chunks": [
          "My uncle changed",
          "two hundred Canadian",
          "dollar",
          "at the bank."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "dollars",
        "flawedSentence": "My uncle changed two hundred Canadian dollar at the bank.",
        "matchLeft": "two hundred Canadian ___",
        "matchRight": "dollars"
      },
      {
        "id": "v2_l1_19",
        "lesson": 1,
        "ruleTag": "ترتیب عدد + صفت + اسم",
        "sentence": "We planted ninety-nine beautiful trees in the school yard.",
        "target": "ninety-nine beautiful trees",
        "cloze": "We planted _____ in the school yard.",
        "promptHint": "tree",
        "options": [
          "ninety-nine beautiful trees",
          "beautiful ninety-nine trees",
          "ninety-nine trees beautiful",
          "ninety-nine beautifuls trees"
        ],
        "fa": "ما نود و نه درخت زیبا در حیاط مدرسه کاشتیم.",
        "explainFa": "کتاب (ص ۳۳، بخش B): ترتیب «عدد + صفت + اسم» است: «ninety-nine beautiful trees»؛ صفت جمع بسته نمی‌شود.",
        "chunks": [
          "We planted",
          "beautiful ninety-nine trees",
          "in the",
          "school yard."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "ninety-nine beautiful trees",
        "flawedSentence": "We planted beautiful ninety-nine trees in the school yard.",
        "matchLeft": "عدد + صفت + اسم (۹۹ درخت زیبا)",
        "matchRight": "ninety-nine beautiful trees"
      },
      {
        "id": "v2_l1_20",
        "lesson": 1,
        "ruleTag": "an قبل از واژهٔ با صدای مصوت",
        "sentence": "She watched an interesting movie about Iran last night.",
        "target": "an",
        "cloze": "She watched _____ interesting movie about Iran last night.",
        "promptHint": "an",
        "options": [
          "an",
          "a",
          "two",
          "many"
        ],
        "fa": "او دیشب یک فیلم جالب دربارهٔ ایران تماشا کرد.",
        "explainFa": "کتاب (ص ۳۳: «an / one interesting movie»): قبل از واژه‌ای که با صدای مصوت شروع می‌شود «an» می‌آید.",
        "chunks": [
          "She watched",
          "a",
          "interesting movie about",
          "Iran last night."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "an",
        "flawedSentence": "She watched a interesting movie about Iran last night.",
        "matchLeft": "___ interesting movie",
        "matchRight": "an",
        "noTyping": true
      },
      {
        "id": "v2_l2_10",
        "lesson": 2,
        "ruleTag": "حال کامل با since و has",
        "sentence": "She has lived in this city since 2015.",
        "target": "has lived",
        "cloze": "She _____ in this city since 2015.",
        "promptHint": "live",
        "options": [
          "has lived",
          "lives",
          "have lived",
          "is living"
        ],
        "fa": "او از سال ۲۰۱۵ در این شهر زندگی می‌کند.",
        "explainFa": "«since» با زمان حال کامل و فعل سوم‌شخص «has» می‌آید.",
        "chunks": [
          "She",
          "lives",
          "in this city",
          "since 2015."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "has lived",
        "flawedSentence": "She lives in this city since 2015.",
        "matchLeft": "She",
        "matchRight": "has lived in this city"
      },
      {
        "id": "v2_l2_11",
        "lesson": 2,
        "ruleTag": "حال کامل منفی با haven't",
        "sentence": "They haven't seen each other for two years.",
        "target": "haven't",
        "cloze": "They _____ seen each other for two years.",
        "promptHint": "have",
        "options": [
          "haven't",
          "hasn't",
          "didn't",
          "don't"
        ],
        "fa": "آن‌ها دو سال است همدیگر را ندیده‌اند.",
        "explainFa": "با «they» از «haven't» استفاده می‌کنیم.",
        "chunks": [
          "They",
          "hasn't",
          "seen each other",
          "for two years."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "haven't",
        "flawedSentence": "They hasn't seen each other for two years.",
        "matchLeft": "They",
        "matchRight": "haven't seen each other"
      },
      {
        "id": "v2_l2_12",
        "lesson": 2,
        "ruleTag": "Have you ever در پرسش",
        "sentence": "Have you ever visited Persepolis?",
        "target": "Have",
        "cloze": "_____ you ever visited Persepolis?",
        "promptHint": "have (شکل درست)",
        "options": [
          "Have",
          "Did",
          "Do",
          "Are"
        ],
        "fa": "آیا تا به حال از پرسپولیس بازدید کرده‌ای؟",
        "explainFa": "«ever» با «Have you» در زمان حال کامل به‌کار می‌رود.",
        "chunks": [
          "Did",
          "you",
          "ever",
          "visited",
          "Persepolis?"
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Have",
        "flawedSentence": "Did you ever visited Persepolis?",
        "matchLeft": "Have",
        "matchRight": "you ever visited Persepolis"
      },
      {
        "id": "v2_l2_13",
        "lesson": 2,
        "ruleTag": "اسم مصدر با فعل مingular در جملهٔ ساده",
        "sentence": "Reading English stories improves your vocabulary fast.",
        "target": "improves",
        "cloze": "Reading English stories _____ your vocabulary fast.",
        "promptHint": "improve",
        "options": [
          "improves",
          "improve",
          "improving",
          "is improve"
        ],
        "fa": "خواندن داستان‌های انگلیسی واژگان شما را سریع‌تر می‌کند.",
        "explainFa": "وقتی فاعل اسم مصدر است، فعل جمله حتماً مفرد «improves» می‌آید.",
        "chunks": [
          "Reading English",
          "stories",
          "improve",
          "your vocabulary fast."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "improves",
        "flawedSentence": "Reading English stories improve your vocabulary fast.",
        "matchLeft": "Reading English stories",
        "matchRight": "improves your vocabulary"
      },
      {
        "id": "v2_l2_14",
        "lesson": 2,
        "ruleTag": "suggest با ing",
        "sentence": "She suggested taking a different route.",
        "target": "taking",
        "cloze": "She suggested _____ a different route.",
        "promptHint": "take",
        "options": [
          "taking",
          "to take",
          "take",
          "takes"
        ],
        "fa": "او پیشنهاد داد مسیر دیگری را انتخاب کنیم.",
        "explainFa": "بعد از «suggest» فعل به شکل «V-ing» می‌آید.",
        "chunks": [
          "She suggested",
          "to take",
          "a different",
          "route."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "taking",
        "flawedSentence": "She suggested to take a different route.",
        "matchLeft": "She suggested",
        "matchRight": "taking a different route"
      },
      {
        "id": "v2_l2_15",
        "lesson": 2,
        "ruleTag": "look forward to با ing",
        "sentence": "He is looking forward to seeing the results of the exam.",
        "target": "to seeing",
        "cloze": "He is looking forward _____ the results of the exam.",
        "promptHint": "see",
        "options": [
          "to seeing",
          "to see",
          "to saw",
          "seeing"
        ],
        "fa": "او مشتاقانه منتظر نتایج امتحان است.",
        "explainFa": "در «look forward to» این «to» حرف اضافه است و فعل شکل «-ing» می‌گیرد.",
        "chunks": [
          "He is looking forward",
          "to see",
          "the results of",
          "the exam."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "to seeing",
        "flawedSentence": "He is looking forward to see the results of the exam.",
        "matchLeft": "He is looking forward",
        "matchRight": "to seeing the results"
      },
      {
        "id": "v2_l2_16",
        "lesson": 2,
        "ruleTag": "فعل دوکلمه‌ای give up (ترک کردن)",
        "sentence": "My father has given up smoking because it is harmful to his health.",
        "target": "up",
        "cloze": "My father has given _____ smoking because it is harmful to his health.",
        "promptHint": "give up",
        "options": [
          "up",
          "on",
          "in",
          "at"
        ],
        "fa": "پدرم سیگار را ترک کرده چون برای سلامتش مضر است.",
        "explainFa": "کتاب (ص ۶۸: «Has your father given up smoking?»): «give up» یعنی ترک کردن.",
        "chunks": [
          "My father has given",
          "on",
          "smoking because it is",
          "harmful to his health."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "up",
        "flawedSentence": "My father has given on smoking because it is harmful to his health.",
        "matchLeft": "give ___ smoking (ترک کردن)",
        "matchRight": "up"
      },
      {
        "id": "v2_l2_17",
        "lesson": 2,
        "ruleTag": "فعل دوکلمه‌ای turn off (خاموش کردن)",
        "sentence": "Turn off the washing machine. It's making too much noise.",
        "target": "off",
        "cloze": "Turn _____ the washing machine. It's making too much noise.",
        "promptHint": "turn off",
        "options": [
          "off",
          "on",
          "up",
          "in"
        ],
        "fa": "ماشین لباسشویی را خاموش کن. خیلی سروصدا می‌کند.",
        "explainFa": "کتاب (ص ۶۸): «turn off» یعنی خاموش کردن؛ «turn on» (روشن کردن) با «too much noise» جور نیست.",
        "chunks": [
          "Turn",
          "on",
          "the washing machine. It's",
          "making too much noise."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "off",
        "flawedSentence": "Turn on the washing machine. It's making too much noise.",
        "matchLeft": "turn ___ the machine (خاموش کردن)",
        "matchRight": "off"
      },
      {
        "id": "v2_l2_18",
        "lesson": 2,
        "ruleTag": "فعل دوکلمه‌ای grow up (بزرگ شدن)",
        "sentence": "Did your brother go to school in Karaj? — No, he grew up in Lavasan.",
        "target": "up",
        "cloze": "Did your brother go to school in Karaj? — No, he grew _____ in Lavasan.",
        "promptHint": "grow up",
        "options": [
          "up",
          "on",
          "at",
          "to"
        ],
        "fa": "برادرت در کرج به مدرسه رفت؟ — نه، او در لواسان بزرگ شد.",
        "explainFa": "کتاب (ص ۶۸: «she grew up in Lavasan»): «grow up» یعنی بزرگ شدن؛ گذشته‌اش «grew up» است.",
        "chunks": [
          "Did your brother go to school",
          "in Karaj? — No, he grew",
          "on",
          "in Lavasan."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "up",
        "flawedSentence": "Did your brother go to school in Karaj? — No, he grew on in Lavasan.",
        "matchLeft": "he grew ___ in Lavasan",
        "matchRight": "up"
      },
      {
        "id": "v2_l2_19",
        "lesson": 2,
        "ruleTag": "فعل دوکلمه‌ای check in (پذیرش شدن)",
        "sentence": "Have you checked in yet? — Oh, yes. I am in my room now.",
        "target": "in",
        "cloze": "Have you checked _____ yet? — Oh, yes. I am in my room now.",
        "promptHint": "check in",
        "options": [
          "in",
          "on",
          "up",
          "at"
        ],
        "fa": "پذیرش شده‌ای؟ — بله، الان در اتاقم هستم.",
        "explainFa": "کتاب (ص ۶۸: «Have you checked in?»): «check in» یعنی پذیرش شدن در هتل یا فرودگاه.",
        "chunks": [
          "Have you checked",
          "on",
          "yet? — Oh, yes. I",
          "am in my room now."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "in",
        "flawedSentence": "Have you checked on yet? — Oh, yes. I am in my room now.",
        "matchLeft": "checked ___ (هتل)",
        "matchRight": "in"
      },
      {
        "id": "v2_l2_20",
        "lesson": 2,
        "ruleTag": "فعل دوکلمه‌ای wake up",
        "sentence": "James usually wakes up early, but today he is still asleep.",
        "target": "up",
        "cloze": "James usually wakes _____ early, but today he is still asleep.",
        "promptHint": "wake up",
        "options": [
          "up",
          "on",
          "in",
          "at"
        ],
        "fa": "جیمز معمولاً زود بیدار می‌شود، ولی امروز هنوز خواب است.",
        "explainFa": "کتاب (ص ۶۸: «James usually wakes up early»): «wake up» یعنی بیدار شدن.",
        "chunks": [
          "James usually wakes",
          "on",
          "early, but today he",
          "is still asleep."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "up",
        "flawedSentence": "James usually wakes on early, but today he is still asleep.",
        "matchLeft": "wakes ___ early",
        "matchRight": "up"
      },
      {
        "id": "v2_l3_9",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول با will در دام",
        "sentence": "If it rains tomorrow, we will stay at home.",
        "target": "rains",
        "cloze": "If it _____ tomorrow, we will stay at home.",
        "promptHint": "rain",
        "options": [
          "rains",
          "will rain",
          "rained",
          "will rains"
        ],
        "fa": "اگر فردا باران ببارد، در خانه می‌مانیم.",
        "explainFa": "در الگوی معمول شرطی نوع اول، بخش «if» برای این پیش‌بینی حال سادهٔ «rains» می‌گیرد؛ کاربردهای ویژهٔ «will» پس از «if» نیز وجود دارند.",
        "chunks": [
          "If it",
          "will rain",
          "tomorrow, we will",
          "stay at home."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "rains",
        "flawedSentence": "If it will rain tomorrow, we will stay at home.",
        "matchLeft": "If",
        "matchRight": "it rains tomorrow"
      },
      {
        "id": "v2_l3_10",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول با نتیجهٔ will",
        "sentence": "You will pass the exam if you study hard.",
        "target": "will",
        "cloze": "You _____ pass the exam if you study hard.",
        "promptHint": "will",
        "options": [
          "will",
          "would",
          "will to",
          "are"
        ],
        "fa": "اگر سخت درس بخوانی، در امتحان قبول می‌شوی.",
        "explainFa": "در شرطی نوع اول (if + حال ساده) در جملهٔ اصلی «will» می‌آید؛ «would» مال شرطی نوع دوم است.",
        "chunks": [
          "You",
          "would",
          "pass the exam if",
          "you study hard."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "will",
        "flawedSentence": "You would pass the exam if you study hard.",
        "matchLeft": "You",
        "matchRight": "will pass the exam",
        "noTyping": true
      },
      {
        "id": "v2_l3_11",
        "lesson": 3,
        "ruleTag": "شرطی نوع اول با don't",
        "sentence": "If you don't study hard, you will fail.",
        "target": "don't study",
        "cloze": "If you _____ hard, you will fail.",
        "promptHint": "do",
        "options": [
          "don't study",
          "doesn't study",
          "will study",
          "didn't study"
        ],
        "fa": "اگر سخت درس نخوانی، مردود می‌شوی.",
        "explainFa": "در بخش شرط با ضمیر «you»، فعل منفی «don't» می‌گیرد.",
        "chunks": [
          "If you",
          "doesn't study",
          "hard, you",
          "will fail."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "don't study",
        "flawedSentence": "If you doesn't study hard, you will fail.",
        "matchLeft": "If",
        "matchRight": "you don't study hard"
      },
      {
        "id": "v2_l3_12",
        "lesson": 3,
        "ruleTag": "مصدر با to پس از want",
        "sentence": "I want to do more speaking practice.",
        "target": "to do",
        "cloze": "I want _____ more speaking practice.",
        "promptHint": "do",
        "options": [
          "to do",
          "doing",
          "do",
          "to doing"
        ],
        "fa": "می‌خواهم تمرین مکالمهٔ بیشتری انجام دهم.",
        "explainFa": "بعد از «want» فعل به شکل «to + V» می‌آید.",
        "chunks": [
          "I want",
          "doing",
          "more speaking",
          "practice."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "to do",
        "flawedSentence": "I want doing more speaking practice.",
        "matchLeft": "I want",
        "matchRight": "to do more speaking practice"
      },
      {
        "id": "v2_l3_13",
        "lesson": 3,
        "ruleTag": "مصدر با to پس از صفت easy",
        "sentence": "It is easy to learn a new language.",
        "target": "is",
        "cloze": "It _____ easy to learn a new language.",
        "promptHint": "be",
        "options": [
          "is",
          "are",
          "be",
          "were"
        ],
        "fa": "یادگیری یک زبان جدید آسان است.",
        "explainFa": "«It» مفرد است و «is» می‌گیرد؛ بعد از «It is + صفت» مصدر با «to» می‌آید: «It is easy to learn».",
        "chunks": [
          "It",
          "are",
          "easy to learn",
          "a new language."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "is",
        "flawedSentence": "It are easy to learn a new language.",
        "matchLeft": "It",
        "matchRight": "is easy to learn",
        "altAnswers": [
          "was"
        ]
      },
      {
        "id": "v2_l3_14",
        "lesson": 3,
        "ruleTag": "مصدر با to پس از agreed",
        "sentence": "They agreed to discuss the new plan.",
        "target": "to discuss",
        "cloze": "They agreed _____ the new plan.",
        "promptHint": "discuss",
        "options": [
          "to discuss",
          "discussing",
          "discuss",
          "to discussing"
        ],
        "fa": "آن‌ها توافق کردند که طرح جدید را بررسی کنند.",
        "explainFa": "بعد از «agreed» مصدر با «to» به‌کار می‌رود.",
        "chunks": [
          "They agreed",
          "discussing",
          "the new",
          "plan."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "to discuss",
        "flawedSentence": "They agreed discussing the new plan.",
        "matchLeft": "They agreed",
        "matchRight": "to discuss the new plan"
      },
      {
        "id": "v2_l3_15",
        "lesson": 3,
        "ruleTag": "مصدر با to پس از promised",
        "sentence": "He promised to take the children to the zoo on Sunday.",
        "target": "to take",
        "cloze": "He promised _____ the children to the zoo on Sunday.",
        "promptHint": "take",
        "options": [
          "to take",
          "taking",
          "take",
          "to taking"
        ],
        "fa": "او قول داد یکشنبه بچه‌ها را به باغ‌وحش ببرد.",
        "explainFa": "بعد از «promised» مصدر با «to» می‌آید.",
        "chunks": [
          "He promised",
          "taking",
          "the children to the",
          "zoo on Sunday."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "to take",
        "flawedSentence": "He promised taking the children to the zoo on Sunday.",
        "matchLeft": "He promised",
        "matchRight": "to take the children"
      },
      {
        "id": "v2_l3_16",
        "lesson": 3,
        "ruleTag": "صفت -ed برای احساس: bored",
        "sentence": "Amir is bored with his present job; he wants a new one.",
        "target": "bored",
        "cloze": "Amir is _____ with his present job; he wants a new one.",
        "promptHint": "bore",
        "options": [
          "bored",
          "boring",
          "bore",
          "bores"
        ],
        "fa": "امیر از شغل فعلی‌اش کسل است؛ کار تازه‌ای می‌خواهد.",
        "explainFa": "کتاب (ص ۹۸: «Amir is bored with his present job»): احساسِ شخص با شکل سوم فعل (-ed) بیان می‌شود؛ «boring» یعنی کسل‌کننده و ویژگیِ خودِ چیز است.",
        "chunks": [
          "Amir is",
          "boring",
          "with his present job; he",
          "wants a new one."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "bored",
        "flawedSentence": "Amir is boring with his present job; he wants a new one.",
        "matchLeft": "Amir is ___ with his job",
        "matchRight": "bored"
      },
      {
        "id": "v2_l3_17",
        "lesson": 3,
        "ruleTag": "صفت -ed برای احساس: excited",
        "sentence": "I'm so excited that we're going to Yazd next week.",
        "target": "excited",
        "cloze": "I'm so _____ that we're going to Yazd next week.",
        "promptHint": "excite",
        "options": [
          "excited",
          "exciting",
          "excite",
          "excitedly"
        ],
        "fa": "خیلی هیجان‌زده‌ام که هفتهٔ بعد به یزد می‌رویم.",
        "explainFa": "کتاب (ص ۹۸: «I'm so excited that we're going to Yazd»): حسِ گوینده ← «excited»؛ «exciting» برای چیزِ هیجان‌انگیز است.",
        "chunks": [
          "I'm so",
          "exciting",
          "that we're going to",
          "Yazd next week."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "excited",
        "flawedSentence": "I'm so exciting that we're going to Yazd next week.",
        "matchLeft": "I'm so ___ (هیجان‌زده)",
        "matchRight": "excited"
      },
      {
        "id": "v2_l3_18",
        "lesson": 3,
        "ruleTag": "صفت -ed برای احساس: surprised",
        "sentence": "They were greatly surprised at the news.",
        "target": "surprised",
        "cloze": "They were greatly _____ at the news.",
        "promptHint": "surprise",
        "options": [
          "surprised",
          "surprising",
          "surprise",
          "surprises"
        ],
        "fa": "آن‌ها از این خبر بسیار شگفت‌زده شدند.",
        "explainFa": "کتاب (ص ۹۸: «They were greatly surprised at the news»): حسِ افراد ← «surprised»؛ خودِ خبر «surprising» است.",
        "chunks": [
          "They were",
          "greatly",
          "surprising",
          "at the news."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "surprised",
        "flawedSentence": "They were greatly surprising at the news.",
        "matchLeft": "They were ___ at the news",
        "matchRight": "surprised"
      },
      {
        "id": "v2_l3_19",
        "lesson": 3,
        "ruleTag": "صفت -ed برای احساس: frightened",
        "sentence": "To tell the truth, I was frightened to death in the dark street.",
        "target": "frightened",
        "cloze": "To tell the truth, I was _____ to death in the dark street.",
        "promptHint": "frighten",
        "options": [
          "frightened",
          "frightening",
          "frighten",
          "frightens"
        ],
        "fa": "راستش را بخواهی، در آن خیابان تاریک تا سرحد مرگ ترسیده بودم.",
        "explainFa": "کتاب (ص ۹۸: «I was frightened to death»): حسِ گوینده ← «frightened»؛ «frightening» یعنی ترسناک.",
        "chunks": [
          "To tell the",
          "truth, I was",
          "frightening",
          "to death in the dark street."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "frightened",
        "flawedSentence": "To tell the truth, I was frightening to death in the dark street.",
        "matchLeft": "I was ___ to death",
        "matchRight": "frightened"
      },
      {
        "id": "v2_l3_20",
        "lesson": 3,
        "ruleTag": "صفت -ed برای احساس: interested",
        "sentence": "I've always been interested in football.",
        "target": "interested",
        "cloze": "I've always been _____ in football.",
        "promptHint": "interest",
        "options": [
          "interested",
          "interesting",
          "interest",
          "interests"
        ],
        "fa": "همیشه به فوتبال علاقه داشته‌ام.",
        "explainFa": "کتاب (ص ۹۸: «I've always been interested in football»): حسِ شخص ← «interested in»؛ «interesting» ویژگیِ خودِ فوتبال است.",
        "chunks": [
          "I've always",
          "been",
          "interesting",
          "in football."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "interested",
        "flawedSentence": "I've always been interesting in football.",
        "matchLeft": "I've always been ___ in football",
        "matchRight": "interested"
      }
    ],
    "onboarding": {
      "id": "v2_onboard",
      "sentence": "How much sugar do you want in your tea?",
      "cloze": "How _____ sugar do you want in your tea?",
      "target": "much",
      "options": [
        "much",
        "many",
        "a lot",
        "few"
      ],
      "fa": "چقدر شکر در چایت می‌خواهی؟",
      "explainFa": "«sugar» غیرقابل‌شمارش است، پس «How much» می‌آید."
    }
  },
  "vision_3": {
    "id": "vision_3",
    "name": "Vision 3",
    "titleFa": "پایه دوازدهم (امتحان نهایی)",
    "modeBadgeFa": "گرامر و پاراگراف‌نویسی امتحان نهایی (Final Exam Lab)",
    "lessonsCount": 3,
    "lessons": [
      {
        "id": 1,
        "titleEn": "Lesson 1: Sense of Appreciation",
        "titleFa": "درس ۱: جملات مجهول (Passive)، پرسش‌های ضمیمه‌ای (Tag Questions) و جملات مرکب",
        "categoryFa": "امتحان نهایی + نگارش",
        "summaryFa": "فرمول طلایی همه زمان‌های مجهول «be (در همان زمان) + P.P. (اسم مفعول)» است: حال ساده (am/is/are + P.P.)، گذشته ساده (was/were + P.P.)، حال کامل (have/has been + P.P.) و مدال/آینده (will/can/must + be + P.P.). در پرسش ضمیمه‌ای (Tag Question)، جمله مثبت، تگ منفی و جمله منفی (حتی با never, hardly, seldom, little, rarely!) تگ مثبت می‌گیرد. در بخش Writing، جملات مرکب با کلمات ربط «, and / , but / , or / , so» دو جمله مستقل را پیوند می‌دهند.",
        "formulas": [
          {
            "label": "مجهول (Passive)",
            "chips": [
              {
                "role": "subj",
                "text": "Penicillin"
              },
              {
                "role": "aux",
                "text": "was discovered"
              },
              {
                "role": "sig",
                "text": "by"
              },
              {
                "role": "obj",
                "text": "Fleming in 1928."
              }
            ],
            "exampleEn": "Many new hospitals have been built recently.",
            "exampleFa": "به‌تازگی بیمارستان‌های جدید بسیاری ساخته شده‌اند.",
            "learnerGlossFa": "پنی‌سیلین در سال ۱۹۲۸ توسط فلمینگ کشف شد."
          },
          {
            "label": "تگ‌کوئسچن (Tag Q)",
            "chips": [
              {
                "role": "subj",
                "text": "Dr. Gharib"
              },
              {
                "role": "verb",
                "text": "helped"
              },
              {
                "role": "obj",
                "text": "sick children,"
              },
              {
                "role": "aux",
                "text": "didn't he?"
              }
            ],
            "exampleEn": "He never forgets elders' kindness, does he?",
            "exampleFa": "او هرگز مهربانی سالمندان را فراموش نمی‌کند، مگر نه؟",
            "learnerGlossFa": "دکتر قریب به کودکان بیمار کمک کرد، مگر نه؟"
          },
          {
            "label": "جمله مرکب (, but / , so)",
            "chips": [
              {
                "role": "subj",
                "text": "Clause 1"
              },
              {
                "role": "sig",
                "text": ", but / , so"
              },
              {
                "role": "obj",
                "text": "Clause 2."
              }
            ],
            "exampleEn": "He was very busy, but he visited his parents.",
            "exampleFa": "او بسیار پرمشغله بود، اما به دیدار والدینش رفت.",
            "learnerGlossFa": "جملهٔ مستقل اول، اما / پس جملهٔ مستقل دوم."
          }
        ],
        "signals": [
          "by + agent → Passive",
          "never / hardly / seldom / rarely؛ تگ معمولاً مثبت",
          "I am → aren’t I?",
          "Let’s → shall we?",
          ", and / , but / , or / , so"
        ],
        "traps": [
          {
            "wrong": "She hardly speaks loudly in class, doesn't she?",
            "right": "She hardly speaks loudly in class, does she?",
            "noteFa": "واژه‌هایی مانند «never»، «hardly»، «rarely»، «seldom»، «nothing» و «nobody» معنای منفی یا نزدیک به منفی دارند؛ در این الگوی تگ معمولاً از تگ مثبت استفاده می‌شود."
          },
          {
            "wrong": "I am late today, amn't I?",
            "right": "I am late today, aren't I?",
            "noteFa": "استثنای مشهور امتحان نهایی: تگ منفی برای «I am ...» عبارت «aren't I?» است!"
          }
        ],
        "timelineType": "passive_shift",
        "timelineCaptionFa": "چرخش کانون جمله در مجهول (Object ➔ Subject + be + P.P.) + ترازوی تگ‌کوئسچن + پیوند جمله مرکب",
        "contextDialogue": {
          "lineA": "Dr. Gharib was deeply respected by everyone, wasn't he?",
          "faA": "دکتر قریب عمیقاً مورد احترام همگان بود، مگر نه؟",
          "lineB": "Yes! He worked tirelessly, so his name has never been forgotten.",
          "faB": "بله! او خستگی‌ناپذیر تلاش کرد، بنابراین نامش هرگز فراموش نشده است."
        },
        "guidedDiscovery": {
          "questionFa": "در جمله «His name has never been forgotten, ___?»، پرسش ضمیمه‌ای (Tag) باید مثبت باشد یا منفی؟",
          "options": [
            "مثبت (has it?) — چون واژه never جمله پایه را منفی کرده است!",
            "منفی (hasn't it?)",
            "گذشته (did it?)"
          ],
          "correctIdx": 0,
          "insightFa": "در این الگو، «never»، «hardly»، «seldom»، «rarely» و «little» در معنای منفی معمولاً تگ مثبت می‌گیرند؛ «a little» معنای متفاوتی دارد."
        },
        "threeD": {
          "formFa": "Passive: be (am/is/are/was/were/been/be) + P.P. | Tag Q: ±Aux + Pronoun? | Compound: , and / , but / , or / , so",
          "meaningFa": "برجسته‌سازی کنش‌پذیر به جای فاعل، تأیید گرفتن در گفت‌وگو و پیوند منطقی دو اندیشه مستقل",
          "useFa": "امتحان نهایی: مجهول در ۵ زمان، استثناهای تگ (I am→aren't I? / Let's→shall we?) و انتخاب دقیق بین but (تضاد)، so (نتیجه) و or (وگرنه)"
        },
        "learnerGuide": {
          "explainFa": "در جملهٔ مجهول، تمرکز بر گیرندهٔ عمل است؛ فعل be با زمان جمله هماهنگ می‌شود و پس از آن شکل سوم فعل می‌آید. در پرسش ضمیمه‌ای معمولاً پس از جملهٔ مثبت، تگ منفی و پس از جملهٔ منفی، تگ مثبت می‌آوریم. دو جملهٔ مستقل می‌توانند با حرف ربط به هم وصل شوند.",
          "examples": [
            {
              "en": "The door was opened.",
              "fa": "در باز شد."
            },
            {
              "en": "He is ready, isn’t he?",
              "fa": "او آماده است، مگر نه؟"
            }
          ]
        }
      },
      {
        "id": 2,
        "titleEn": "Lesson 2: Look It Up!",
        "titleFa": "درس ۲: جمله‌واره‌های موصولی (who / whom / which)، شرطی نوع دوم و جمله موضوع (Topic Sentence)",
        "categoryFa": "امتحان نهایی + نگارش",
        "summaryFa": "در جمله‌وارهٔ موصولی، «who» برای انسان در جایگاه فاعل و «whom» در نوشتار رسمی برای مفعول انسانی به کار می‌رود. در شرطی نوع دوم، گذشتهٔ ساده پس از «if» وضعیت فرضی در حال یا آینده را بیان می‌کند و نتیجه معمولاً «would + فعل ساده» دارد. در نوشتار رسمی «were» برای همهٔ ضمیرها رایج است؛ «was» نیز در گفتار غیررسمی شنیده می‌شود. جملهٔ موضوع (Topic Sentence) ایدهٔ اصلی پاراگراف را معرفی می‌کند.",
        "formulas": [
          {
            "label": "تشخیص who و whom",
            "chips": [
              {
                "role": "subj",
                "text": "انسان +"
              },
              {
                "role": "aux",
                "text": "who"
              },
              {
                "role": "verb",
                "text": "+ فعل"
              },
              {
                "role": "sig",
                "text": "|"
              },
              {
                "role": "subj",
                "text": "انسان +"
              },
              {
                "role": "aux",
                "text": "whom"
              },
              {
                "role": "obj",
                "text": "+ فاعل + فعل"
              }
            ],
            "exampleEn": "The author whom we met yesterday wrote this dictionary.",
            "exampleFa": "نویسنده‌ای که دیروز او را دیدیم این فرهنگ‌لغت را نوشت.",
            "learnerGlossFa": "برای فاعل انسانی who و برای مفعول انسانی در نوشتار رسمی whom به کار می‌رود."
          },
          {
            "label": "شرطی نوع دوم (خیالی)",
            "chips": [
              {
                "role": "sig",
                "text": "If"
              },
              {
                "role": "subj",
                "text": "I"
              },
              {
                "role": "verb",
                "text": "were"
              },
              {
                "role": "obj",
                "text": "you,"
              },
              {
                "role": "aux",
                "text": "I would use"
              },
              {
                "role": "obj",
                "text": "a monolingual dictionary."
              }
            ],
            "exampleEn": "If she had enough money, she could buy that encyclopedia.",
            "exampleFa": "اگر پول کافی داشت، می‌توانست آن دانشنامه را بخرد.",
            "learnerGlossFa": "اگر جای تو بودم، از فرهنگ یک‌زبانه استفاده می‌کردم."
          }
        ],
        "signals": [
          "Human + ___ + Verb → who",
          "Human + ___ + Subj + Verb → whom",
          "Thing + ___ → which",
          "If + Past (were) → would/could + V",
          "Topic + Controlling Idea"
        ],
        "traps": [
          {
            "wrong": "The physician whom cured the child was Dr. Gharib.",
            "right": "The physician who cured the child was Dr. Gharib.",
            "noteFa": "چون بلافاصله بعد از جای خالی فعل «cured» آمده (نه فاعل!)، جایگاه فاعلی است و فقط «who» (یا that) درست است، نه «whom»!"
          },
          {
            "wrong": "If I have wings now, I would fly around the world.",
            "right": "If I had wings now, I would fly around the world.",
            "noteFa": "در این مثال شرطی نوع دوم، موقعیت خیالی است؛ پس برای شرط «had» و برای نتیجه «would fly» به کار می‌رود."
          }
        ],
        "timelineType": "clause_link",
        "timelineCaptionFa": "پل ضمایر موصولی (who فاعلی / whom مفعولی / which اشیا) + دنیای خیالی شرطی نوع دوم",
        "contextDialogue": {
          "lineA": "Do you know the scholar whom our teacher praised yesterday?",
          "faA": "آیا پژوهشگری را که دبیرمان دیروز تحسینش کرد می‌شناسی؟",
          "lineB": "Yes, that's Dr. Moein, who compiled a great dictionary! If I were a linguist, I would follow his path.",
          "faB": "بله، ایشان دکتر معین است که فرهنگ‌لغت بزرگی تألیف کرد! اگر زبان‌شناس بودم، راه او را ادامه می‌دادم."
        },
        "guidedDiscovery": {
          "questionFa": "چگونه در ۳ ثانیه در جلسه امتحان نهایی بین «who» و «whom» تصمیم بگیریم؟",
          "options": [
            "اگر بعد از جای خالی «فعل» آمد فاعلی است (who) و اگر «فاعل + فعل» یا قبلش حرف اضافه (to/with) آمد مفعولی است (whom)!",
            "who برای مذکر است و whom برای مؤنث",
            "whom فقط برای اشیا به کار می‌رود"
          ],
          "correctIdx": 0,
          "insightFa": "فرمول ۳ ثانیه‌ای امتحان نهایی! انسان + ___ + فعل = who | انسان + ___ + فاعل + فعل (یا حرف اضافه + ___) = whom."
        },
        "threeD": {
          "formFa": "Relative: who / whom / which (that) | Cond. Type 2: If + Past (were), would/could/might + V | Topic Sentence",
          "meaningFa": "توصیف دقیق مرجع اسم بدون تکرار جمله + بیان فرض خلاف واقع در زمان حال",
          "useFa": "حتی با دیدن واژه now، اگر موقعیت تخیلی باشد شرطی نوع دوم (گذشته ساده + would) است! در نگارش نیز Topic Sentence = Topic + Controlling Idea"
        },
        "learnerGuide": {
          "explainFa": "در جمله‌وارهٔ موصولی، who می‌تواند نقش فاعل و whom در نوشتار رسمی نقش مفعول انسان را داشته باشد. در شرطی نوع دوم، گذشتهٔ ساده پس از if برای وضعیتی فرضی در حال یا آینده به کار می‌رود و نتیجه معمولاً would همراه فعل ساده دارد؛ were در نوشتار رسمی رایج است. جملهٔ موضوع، موضوع و ایدهٔ اصلی بند را معرفی می‌کند.",
          "examples": [
            {
              "en": "The person who called is my teacher.",
              "fa": "شخصی که تماس گرفت معلم من است."
            },
            {
              "en": "If I were you, I would study.",
              "fa": "اگر جای تو بودم، درس می‌خواندم."
            }
          ]
        }
      },
      {
        "id": 3,
        "titleEn": "Lesson 3: Renewable Energy",
        "titleFa": "درس ۳: مجهول با افعال وجهی + گذشته کامل (Past Perfect) + نگارش پاراگراف",
        "categoryFa": "امتحان نهایی + نگارش",
        "summaryFa": "دستور اصلی این درس در کتاب «مجهول با افعال وجهی» است (ص ۸۶–۸۷): «modal + be + P.P» مثل «The parents should be called»؛ آوردن انجام‌دهنده با by اختیاری است. See Also (ص ۸۸) «گذشته کامل» است: از دو کار گذشته، کار قدیمی‌تر با «had + P.P» می‌آید (After / Because + had P.P.). در Writing، پاراگراف = Topic Sentence + Supporting Sentences + Concluding Sentence.",
        "formulas": [
          {
            "label": "مجهول با فعل وجهی (کتاب ص ۸۶)",
            "chips": [
              {
                "role": "subj",
                "text": "The parents"
              },
              {
                "role": "aux",
                "text": "should be"
              },
              {
                "role": "verb",
                "text": "called"
              },
              {
                "role": "obj",
                "text": "(by the principal)."
              }
            ],
            "exampleEn": "The traffic rules must be obeyed (by everyone).",
            "exampleFa": "قوانین راهنمایی و رانندگی باید (توسط همه) رعایت شوند.",
            "learnerGlossFa": "بهتر است والدین (توسط مدیر) فراخوانده شوند."
          },
          {
            "label": "پرسشی و منفی",
            "chips": [
              {
                "role": "aux",
                "text": "Can"
              },
              {
                "role": "subj",
                "text": "wind"
              },
              {
                "role": "aux",
                "text": "be"
              },
              {
                "role": "verb",
                "text": "changed"
              },
              {
                "role": "obj",
                "text": "into electricity?"
              }
            ],
            "exampleEn": "Not all types of waste can be used to produce fuel.",
            "exampleFa": "همهٔ انواع زباله را نمی‌توان برای تولید سوخت به کار برد.",
            "learnerGlossFa": "آیا می‌توان باد را به برق تبدیل کرد؟"
          },
          {
            "label": "فرمول After / Because",
            "chips": [
              {
                "role": "sig",
                "text": "After"
              },
              {
                "role": "subj",
                "text": "he"
              },
              {
                "role": "aux",
                "text": "had finished"
              },
              {
                "role": "obj",
                "text": "his thesis,"
              },
              {
                "role": "verb",
                "text": "he went"
              },
              {
                "role": "obj",
                "text": "abroad."
              }
            ],
            "exampleEn": "Ali was tired because he had worked on the solar panel all day.",
            "exampleFa": "علی خسته بود چون تمام روز روی پنل خورشیدی کار کرده بود.",
            "learnerGlossFa": "پس از تمام‌کردن پایان‌نامه‌اش، او به خارج از کشور رفت."
          },
          {
            "label": "فرمول Before / By the time",
            "chips": [
              {
                "role": "sig",
                "text": "Before"
              },
              {
                "role": "subj",
                "text": "the sun"
              },
              {
                "role": "verb",
                "text": "set,"
              },
              {
                "role": "aux",
                "text": "they had installed"
              },
              {
                "role": "obj",
                "text": "the wind turbine."
              }
            ],
            "exampleEn": "By the time we arrived at the station, the train had left.",
            "exampleFa": "تا زمانی که ما به ایستگاه رسیدیم، قطار رفته بود.",
            "learnerGlossFa": "پیش از غروب خورشید، آن‌ها توربین بادی را نصب کرده بودند."
          }
        ],
        "signals": [
          "can / may / should / must + be + P.P.",
          "by + انجام‌دهنده (اختیاری)",
          "after + had P.P.",
          "before + Simple Past؛ برای تأکید بر تقدم، had + P.P.",
          "because + had P.P.",
          "by the time + Simple Past؛ برای بیان تقدم، had + P.P."
        ],
        "traps": [
          {
            "wrong": "Garbage should collected by workers.",
            "right": "Garbage should be collected by workers.",
            "noteFa": "در مجهول با فعل وجهی، «be» حذف نمی‌شود: فعل وجهی + be + اسم مفعول (should be collected)."
          },
          {
            "wrong": "Before the guests arrived, Mother had cook dinner.",
            "right": "Before the guests arrived, Mother had cooked dinner.",
            "noteFa": "در گذشتهٔ کامل پس از «had» شکل سوم فعل می‌آید: «had cooked». جملهٔ «Before the guests arrived, Mother cooked dinner» نیز می‌تواند درست باشد؛ خود «before» ترتیب را نشان می‌دهد."
          },
          {
            "wrong": "After she had graduated, she finded a job.",
            "right": "After she had graduated, she found a job.",
            "noteFa": "گذشتهٔ «find» بی‌قاعده و «found» است. در این توالی می‌توان «had graduated» را برای رویداد اول و «found» را برای رویداد بعدی آورد؛ کاربرد گذشتهٔ کامل در هر دو بخش به بافت زمانی بستگی دارد."
          }
        ],
        "timelineType": "past_perfect_seq",
        "timelineCaptionFa": "تقدم زمانی در گذشته: رخداد اول (قدیمی‌تر = had + P.P.) ◄ رخداد دوم (گذشته ساده) ◄ زمان حال",
        "contextDialogue": {
          "lineA": "Why did the engineers celebrate yesterday afternoon?",
          "faA": "چرا مهندسان دیروز بعدازظهر جشن گرفتند؟",
          "lineB": "Because they had successfully connected the wind turbines before the storm started!",
          "faB": "چون پیش از آنکه طوفان شروع شود، توربین‌های بادی را با موفقیت متصل کرده بودند!"
        },
        "guidedDiscovery": {
          "questionFa": "در جمله بالا کدام اتفاق در دنیای واقعی «زودتر» رخ داده است؟",
          "options": [
            "اتصال توربین‌ها (had connected — عمل اول با ماضی بعید) و سپس شروع طوفان (started — عمل دوم با گذشته ساده)",
            "اول طوفان شروع شد و بعد توربین متصل شد",
            "هر دو هم‌زمان در آینده رخ می‌دهند"
          ],
          "correctIdx": 0,
          "insightFa": "گذشتهٔ کامل «had + P.P.» رویداد یا وضعیتی را پیش از یک زمان یا رویداد دیگر در گذشته نشان می‌دهد. در این مثال، اتصال زودتر از شروع طوفان رخ داده است."
        },
        "threeD": {
          "formFa": "Modal + be + P.P. (مجهول با فعل وجهی) | After / Because + had P.P. , Simple Past | Before / By the time / When + Simple Past , had P.P.",
          "meaningFa": "بیان امکان، اجبار، توصیه یا احتمال وقتی انجام‌دهنده مهم نیست؛ نشان دادن ترتیب دقیق دو رویداد در گذشته و بیان علتی که پیش از معلولِ گذشته رخ داده است",
          "useFa": "کتاب ص ۸۶–۸۷: تبدیل معلوم به مجهول با حفظ فعل وجهی؛ امتحان نهایی: دقت به مجهول ماضی بعید (had been + P.P.) و معماری پاراگراف کامل (Topic + Supporting + Concluding با In short,)"
        },
        "mainDiscovery": {
          "questionFa": "در «The parents should be called by the principal» چه کسی تماس می‌گیرد؟",
          "options": [
            "مدیر؛ والدین تماس را دریافت می‌کنند، پس جمله مجهول است: should + be + P.P.",
            "والدین؛ پس باید «should call» بیاید",
            "هیچ‌کس؛ «called» اینجا صفت است"
          ],
          "correctIdx": 0,
          "insightFa": "کتاب ص ۸۶–۸۷: در مجهول با فعل وجهی، خودِ فعل وجهی می‌ماند و بعد از آن «be + P.P» می‌آید: «A fish salad may be made for dinner»"
        },
        "learnerGuide": {
          "explainFa": "برای مجهول با فعل وجهی، بعد از فعل وجهی، be و شکل سوم فعل می‌آید؛ نام انجام‌دهنده با by اختیاری است. گذشتهٔ کامل با had و شکل سوم فعل ساخته می‌شود و می‌تواند کاری را پیش از زمان یا رویداد دیگری در گذشته نشان دهد. یک بند منسجم معمولاً جملهٔ موضوع، جمله‌های پشتیبان و جملهٔ پایانی دارد.",
          "examples": [
            {
              "en": "The rules must be followed.",
              "fa": "قوانین باید رعایت شوند."
            },
            {
              "en": "The train had left before we arrived.",
              "fa": "پیش از رسیدن ما، قطار رفته بود."
            }
          ]
        }
      }
    ],
    "items": [
      {
        "id": "v3_l1_1",
        "lesson": 1,
        "ruleTag": "مجهول گذشته ساده",
        "sentence": "The Persian Gulf bridge project was completed by Iranian engineers two years ago.",
        "target": "was completed",
        "cloze": "The Persian Gulf bridge project _____ by Iranian engineers two years ago.",
        "promptHint": "complete — passive",
        "options": [
          "was completed",
          "completed",
          "has been completed",
          "were completed"
        ],
        "fa": "پروژه پل خلیج‌فارس دو سال پیش توسط مهندسان ایرانی تکمیل شد.",
        "explainFa": "وجود «by Iranian engineers» (مجهول)، «two years ago» (گذشته ساده) و فاعل مفرد (project) ← «was completed».",
        "chunks": [
          "The Persian Gulf bridge project",
          "completed",
          "by Iranian engineers",
          "two years ago."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "was completed",
        "flawedSentence": "The Persian Gulf bridge project completed by Iranian engineers two years ago.",
        "matchLeft": "مجهول + two years ago",
        "matchRight": "was / were + P.P."
      },
      {
        "id": "v3_l1_10",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن استثنای I am",
        "sentence": "I am invited to the university appreciation ceremony, aren't I?",
        "target": "aren't I",
        "cloze": "I am invited to the university appreciation ceremony, _____?",
        "promptHint": "tag of I am",
        "options": [
          "aren't I",
          "amn't I",
          "am I",
          "don't I"
        ],
        "fa": "من به آیین سپاسگزاری دانشگاه دعوت شده‌ام، مگر نه؟",
        "explainFa": "جمله «I am ...» مثبت است و در تگ منفی استثنائاً «aren't I?» می‌گیرد (اما برای I am not تگ am I? می‌آید!).",
        "chunks": [
          "I am invited",
          "to the",
          "university appreciation ceremony,",
          "amn't I?"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "aren't I?",
        "flawedSentence": "I am invited to the university appreciation ceremony, amn't I?",
        "matchLeft": "I am ... , ___?",
        "matchRight": "aren't I?"
      },
      {
        "id": "v3_l1_11",
        "lesson": 1,
        "ruleTag": "Writing: جمله مرکب انتخاب با or",
        "sentence": "You should write down the new collocations, or you may forget them soon.",
        "target": "or",
        "cloze": "You should write down the new collocations, _____ you may forget them soon.",
        "promptHint": "compound 'or'",
        "options": [
          "or",
          "but",
          "so",
          "nor"
        ],
        "fa": "باید هم‌آیندهای جدید را یادداشت کنی، وگرنه ممکن است به‌زودی فراموششان کنی.",
        "explainFa": "حرف ربط «, or» برای بیان انتخاب یا پیامد منفیِ انجام ندادن توصیه قبلی («وگرنه») به کار می‌رود.",
        "chunks": [
          "You should write down",
          "the new collocations,",
          "but",
          "you may forget them soon."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "or",
        "flawedSentence": "You should write down the new collocations, but you may forget them soon.",
        "matchLeft": "توصیه، + ___ (وگرنه)",
        "matchRight": ", or",
        "noTyping": true
      },
      {
        "id": "v3_l1_2",
        "lesson": 1,
        "ruleTag": "مجهول حال کامل",
        "sentence": "Several modern clinics have been built in deprived villages since 2022.",
        "target": "have been built",
        "cloze": "Several modern clinics _____ in deprived villages since 2022.",
        "promptHint": "build — passive",
        "options": [
          "have been built",
          "have built",
          "has been built",
          "were built"
        ],
        "fa": "از سال ۲۰۲۲ تاکنون چندین درمانگاه مدرن در روستاهای محروم ساخته شده است.",
        "explainFa": "نشانه «since 2022» (حال کامل) + مفعول جمع غیرجاندار در جایگاه فاعل (clinics) ← مجهول حال کامل «have been built».",
        "chunks": [
          "Several modern clinics",
          "have built",
          "in deprived",
          "villages since 2022."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "have been built",
        "flawedSentence": "Several modern clinics have built in deprived villages since 2022.",
        "matchLeft": "مجهول + since / so far",
        "matchRight": "have/has been + P.P."
      },
      {
        "id": "v3_l1_3",
        "lesson": 3,
        "ruleTag": "مجهول افعال وجهی (Modal Passive)",
        "sentence": "Elders' valuable experiences must be respected by the younger generation.",
        "target": "must be respected",
        "cloze": "Elders' valuable experiences _____ by the younger generation.",
        "promptHint": "respect — passive",
        "options": [
          "must be respected",
          "must respect",
          "must respected",
          "are respecting"
        ],
        "fa": "تجربه‌های ارزشمند سالمندان باید توسط نسل جوان گرامی داشته شود.",
        "explainFa": "ساختار مجهول با افعال وجهی: «Modal + be + P.P.» ← «must be respected».",
        "chunks": [
          "Elders' valuable experiences",
          "must respected",
          "by the",
          "younger generation."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "must be respected",
        "flawedSentence": "Elders' valuable experiences must respected by the younger generation.",
        "matchLeft": "مجهول با must / can / will",
        "matchRight": "modal + be + P.P."
      },
      {
        "id": "v3_l1_4",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن با قید منفی hardly/never",
        "sentence": "A grateful student never forgets his first teacher's kindness, does he?",
        "target": "does he",
        "cloze": "A grateful student never forgets his first teacher's kindness, _____?",
        "promptHint": "tag question",
        "options": [
          "does he",
          "doesn't he",
          "isn't he",
          "did he"
        ],
        "fa": "یک دانش‌آموز قدردان هرگز مهربانی نخستین معلمش را فراموش نمی‌کند، مگر نه؟",
        "explainFa": "قید «never» جمله را منفی کرده است؛ پس تگ حتماً مثبت است و با فعل حال ساده «forgets» می‌شود «does he?».",
        "chunks": [
          "A grateful student",
          "never forgets his",
          "first teacher's kindness,",
          "doesn't he?"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "does he?",
        "flawedSentence": "A grateful student never forgets his first teacher's kindness, doesn't he?",
        "matchLeft": "never / hardly / seldom",
        "matchRight": "تگ مثبت!",
        "noTyping": true
      },
      {
        "id": "v3_l1_5",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن استثنایی I am و Let's",
        "sentence": "Let's buy a nice bouquet of flowers for Mother's Day, shall we?",
        "target": "shall we",
        "cloze": "Let's buy a nice bouquet of flowers for Mother's Day, _____?",
        "promptHint": "tag of Let's",
        "options": [
          "shall we",
          "will you",
          "aren't I",
          "don't we"
        ],
        "fa": "بیایید برای روز مادر یک دسته‌گل زیبا بخریم، موافقید؟",
        "explainFa": "تگ استاندارد پیشنهاد با «Let's ...» همیشه «shall we?» است (و برای I am عبارت aren't I?).",
        "chunks": [
          "Let's buy a",
          "nice bouquet of flowers",
          "for Mother's Day,",
          "don't we?"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "shall we?",
        "flawedSentence": "Let's buy a nice bouquet of flowers for Mother's Day, don't we?",
        "matchLeft": "تگِ Let's ...",
        "matchRight": "shall we?",
        "noTyping": true
      },
      {
        "id": "v3_l1_6",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن با ضمایر مبهم everybody",
        "sentence": "Everybody appreciated Dr. Gharib's selfless efforts, didn't they?",
        "target": "didn't they",
        "cloze": "Everybody appreciated Dr. Gharib's selfless efforts, _____?",
        "promptHint": "everybody → they",
        "options": [
          "didn't they",
          "didn't he",
          "did they",
          "weren't they"
        ],
        "fa": "همگان قدردان تلاش‌های فداکارانه دکتر قریب بودند، مگر نه؟",
        "explainFa": "مرجع ضمایر «everybody, someone, nobody» در تگ‌کوئسچن ضمیر «they» است و گذشته مثبت «appreciated» تگ «didn't they» می‌خواهد.",
        "chunks": [
          "Everybody appreciated",
          "Dr. Gharib's",
          "selfless efforts,",
          "didn't he?"
        ],
        "wrongChunkIdx": 3,
        "fixedChunk": "didn't they?",
        "flawedSentence": "Everybody appreciated Dr. Gharib's selfless efforts, didn't he?",
        "matchLeft": "everyone / somebody (تگ)",
        "matchRight": "they"
      },
      {
        "id": "v3_l1_7",
        "lesson": 1,
        "ruleTag": "Writing: جمله مرکب تضاد با but",
        "sentence": "Avicenna wrote many medical books in Arabic, but he also loved the Persian language.",
        "target": "but",
        "cloze": "Avicenna wrote many medical books in Arabic, _____ he also loved the Persian language.",
        "promptHint": "and / but / or / so",
        "options": [
          "but",
          "so",
          "or",
          "for example"
        ],
        "fa": "ابن‌سینا کتاب‌های پزشکی بسیاری به عربی نوشت، اما به زبان فارسی نیز عشق می‌ورزید.",
        "explainFa": "بین دو مفهوم دارای تقابل (نوشتن به عربی در مقابل عشق به فارسی) حرف ربط هم‌پایه‌ساز «, but» می‌آید.",
        "chunks": [
          "Avicenna wrote many medical",
          "books in Arabic,",
          "so",
          "he also loved the Persian language."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "but",
        "flawedSentence": "Avicenna wrote many medical books in Arabic, so he also loved the Persian language.",
        "matchLeft": "تقابل دو جمله مستقل",
        "matchRight": ", but"
      },
      {
        "id": "v3_l1_8",
        "lesson": 1,
        "ruleTag": "Writing: جمله مرکب نتیجه با so",
        "sentence": "It was snowing heavily on the mountain road, so the police closed the highway.",
        "target": "so",
        "cloze": "It was snowing heavily on the mountain road, _____ the police closed the highway.",
        "promptHint": "cause → effect",
        "options": [
          "so",
          "but",
          "or",
          "yet"
        ],
        "fa": "در جاده کوهستانی برف سنگینی می‌بارید، بنابراین پلیس بزرگراه را بست.",
        "explainFa": "وقتی جمله دوم «نتیجه منطقی» جمله اول است، پس از ویرگول حرف ربط «so» به کار می‌رود.",
        "chunks": [
          "It was snowing heavily",
          "on the mountain road,",
          "or",
          "the police closed the highway."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "so",
        "flawedSentence": "It was snowing heavily on the mountain road, or the police closed the highway.",
        "matchLeft": "علت، + ___ + نتیجه",
        "matchRight": ", so",
        "noTyping": true
      },
      {
        "id": "v3_l1_9",
        "lesson": 1,
        "ruleTag": "مجهول حال ساده (عمومی)",
        "sentence": "Millions of text messages are sent around the world every minute.",
        "target": "are sent",
        "cloze": "Millions of text messages _____ around the world every minute.",
        "promptHint": "send — passive",
        "options": [
          "are sent",
          "send",
          "are send",
          "have sent"
        ],
        "fa": "هر دقیقه میلیون‌ها پیامک در سراسر جهان فرستاده می‌شود.",
        "explainFa": "قید تکرار «every minute» (حال ساده) + فاعل جمع مفعولی (messages) ← مجهول حال ساده «are sent».",
        "chunks": [
          "Millions of text messages",
          "send",
          "around the",
          "world every minute."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are sent",
        "flawedSentence": "Millions of text messages send around the world every minute.",
        "matchLeft": "مجهول + every day",
        "matchRight": "am/is/are + P.P."
      },
      {
        "id": "v3_l2_1",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی فاعلی انسان who",
        "sentence": "Dehkhoda was the great Iranian scholar who compiled the largest Persian dictionary.",
        "target": "who",
        "cloze": "Dehkhoda was the great Iranian scholar _____ compiled the largest Persian dictionary.",
        "promptHint": "who / whom / which",
        "options": [
          "who",
          "whom",
          "which",
          "whose"
        ],
        "fa": "دهخدا دانشمند بزرگ ایرانی بود که بزرگ‌ترین لغت‌نامه فارسی را گردآوری کرد.",
        "explainFa": "مرجع «scholar» انسان است و بلافاصله بعد از جای خالی فعل «compiled» آمده؛ پس فاعلی است: «who».",
        "chunks": [
          "Dehkhoda was the",
          "great Iranian scholar",
          "whom",
          "compiled the largest Persian dictionary."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "who",
        "flawedSentence": "Dehkhoda was the great Iranian scholar whom compiled the largest Persian dictionary.",
        "matchLeft": "انسان + ___ + فعل",
        "matchRight": "who",
        "altAnswers": [
          "that"
        ]
      },
      {
        "id": "v3_l2_10",
        "lesson": 2,
        "ruleTag": "تبدیل موقعیت واقعی به شرطی نوع دوم",
        "sentence": "I don't know his phone number, so I can't call him; if I knew it, I could call him.",
        "target": "knew",
        "cloze": "I don't know his phone number, so I can't call him; if I _____ it, I could call him.",
        "promptHint": "reality → Type 2",
        "options": [
          "knew",
          "know",
          "didn't know",
          "had known"
        ],
        "fa": "شماره‌اش را نمی‌دانم، پس نمی‌توانم زنگ بزنم؛ اگر می‌دانستم، می‌توانستم به او زنگ بزنم.",
        "explainFa": "در امتحان نهایی هنگام تبدیل واقعیت منفی در حال (don't know) به شرطی نوع دوم، فعل مثبت در گذشته ساده (knew) می‌شود!",
        "chunks": [
          "I don't know his phone number,",
          "so I can't call him; if I",
          "know",
          "it, I could call him."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "knew",
        "flawedSentence": "I don't know his phone number, so I can't call him; if I know it, I could call him.",
        "matchLeft": "تبدیل don't know به شرطی ۲",
        "matchRight": "if I knew (مثبت گذشته!)",
        "noTyping": true
      },
      {
        "id": "v3_l2_2",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی مفعولی انسان whom",
        "sentence": "The lexicographer whom you interviewed at the conference teaches at Farhangian University.",
        "target": "whom",
        "cloze": "The lexicographer _____ you interviewed at the conference teaches at Farhangian University.",
        "promptHint": "who / whom / which",
        "options": [
          "whom",
          "which",
          "whose",
          "where"
        ],
        "fa": "فرهنگ‌نگاری که در همایش با او مصاحبه کردید در دانشگاه فرهنگیان تدریس می‌کند.",
        "explainFa": "مرجع «lexicographer» انسان است و بعد از جای خالی «فاعل + فعل (you interviewed)» آمده؛ پس نقش مفعولی «whom» دارد.",
        "chunks": [
          "The lexicographer",
          "which",
          "you interviewed at the",
          "conference teaches at Farhangian University."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "whom",
        "flawedSentence": "The lexicographer which you interviewed at the conference teaches at Farhangian University.",
        "matchLeft": "انسان + ___ + فاعل + فعل",
        "matchRight": "whom",
        "altAnswers": [
          "that"
        ],
        "informalAnswers": [
          {
            "f": "who",
            "n": "«who» در جایگاه مفعولی در گفتار رایج است، اما در نوشتار رسمی (معیار امتحان) «whom» می‌آید."
          }
        ]
      },
      {
        "id": "v3_l2_3",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی بعد از حرف اضافه",
        "sentence": "The advisor to whom the students sent their research proposals answered very kindly.",
        "target": "whom",
        "cloze": "The advisor to _____ the students sent their research proposals answered very kindly.",
        "promptHint": "prep + whom",
        "options": [
          "whom",
          "who",
          "that",
          "which"
        ],
        "fa": "استاد راهنمایی که دانشجویان طرح پژوهشی خود را برای او فرستادند بسیار محترمانه پاسخ داد.",
        "explainFa": "در نوشتار رسمی، بلافاصله پس از حرف اضافه (to / with / for) برای انسان «whom» می‌آید: «to whom»؛ «that» هرگز بعد از حرف اضافه نمی‌آید و «to who» محاوره‌ای است.",
        "chunks": [
          "The advisor to",
          "that",
          "the students sent their",
          "research proposals answered very kindly."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "whom",
        "flawedSentence": "The advisor to that the students sent their research proposals answered very kindly.",
        "matchLeft": "to / with + ___ (انسان)",
        "matchRight": "فقط whom!",
        "informalAnswers": [
          {
            "f": "who",
            "n": "«who» در جایگاه مفعولی در گفتار رایج است، اما در نوشتار رسمی (معیار امتحان) «whom» می‌آید."
          }
        ]
      },
      {
        "id": "v3_l2_4",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی غیرانسان which",
        "sentence": "A monolingual dictionary which provides clear example sentences helps learners think in English.",
        "target": "which",
        "cloze": "A monolingual dictionary _____ provides clear example sentences helps learners think in English.",
        "promptHint": "relative for things",
        "options": [
          "which",
          "who",
          "whom",
          "whose"
        ],
        "fa": "فرهنگ‌لغت تک‌زبانه‌ای که جملات نمونه روشن ارائه می‌دهد به زبان‌آموزان کمک می‌کند به انگلیسی فکر کنند.",
        "explainFa": "مرجع «A monolingual dictionary» شیء است؛ بنابراین ضمیر موصولی «which» به کار می‌رود.",
        "chunks": [
          "A monolingual dictionary",
          "who",
          "provides clear example sentences",
          "helps learners think in English."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "which",
        "flawedSentence": "A monolingual dictionary who provides clear example sentences helps learners think in English.",
        "matchLeft": "شیء/حیوان + ___",
        "matchRight": "which",
        "noTyping": true
      },
      {
        "id": "v3_l2_5",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم با were برای همه اشخاص",
        "sentence": "If I were in your shoes, I would look up every new collocation in Oxford Dictionary.",
        "target": "were",
        "cloze": "If I _____ in your shoes, I would look up every new collocation in Oxford Dictionary.",
        "promptHint": "Conditional Type 2",
        "options": [
          "were",
          "am",
          "will be",
          "have been"
        ],
        "fa": "اگر جای تو بودم، هر هم‌آیند جدید را در فرهنگ‌لغت آکسفورد جستجو می‌کردم.",
        "explainFa": "در شرطی نوع دوم (جواب: would look up)، برای همه ضمایر از جمله I/he/she فعل «were» شکل معیار امتحان نهایی است.",
        "chunks": [
          "If I",
          "am",
          "in your shoes, I would look",
          "up every new collocation in Oxford Dictionary."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "If I am in your shoes, I would look up every new collocation in Oxford Dictionary.",
        "matchLeft": "If I / he ___ , would + V",
        "matchRight": "were",
        "noTyping": true
      },
      {
        "id": "v3_l2_6",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم خلاف واقع در حال",
        "sentence": "If our town had a bigger public library now, students could study there peacefully.",
        "target": "had",
        "cloze": "If our town _____ a bigger public library now, students could study there peacefully.",
        "promptHint": "unreal present",
        "options": [
          "had",
          "has",
          "will have",
          "have"
        ],
        "fa": "اگر شهر ما اکنون کتابخانه عمومی بزرگ‌تری می‌داشت، دانش‌آموزان می‌توانستند با آرامش آنجا درس بخوانند.",
        "explainFa": "فریب واژه «now» را نخورید! وجود «could study» نشان‌دهنده شرطی نوع دوم (خیالی در حال) است؛ پس گذشته ساده «had» می‌آید.",
        "chunks": [
          "If our town",
          "has",
          "a bigger public library now,",
          "students could study there peacefully."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had",
        "flawedSentence": "If our town has a bigger public library now, students could study there peacefully.",
        "matchLeft": "شرطی خیالی با now",
        "matchRight": "گذشته ساده + would/could",
        "noTyping": true
      },
      {
        "id": "v3_l2_7",
        "lesson": 2,
        "ruleTag": "Writing: ویژگی Topic Sentence استاندارد",
        "sentence": "Online dictionaries offer three major advantages for EFL university students.",
        "target": "advantages",
        "cloze": "Online dictionaries offer three major _____ for EFL university students.",
        "promptHint": "plural after three",
        "options": [
          "advantages",
          "advantage",
          "advantage's",
          "advantageous"
        ],
        "fa": "فرهنگ‌لغت‌های آنلاین سه مزیت عمده برای دانشجویان زبان انگلیسی فراهم می‌کنند.",
        "explainFa": "بعد از عدد (three) اسم جمع می‌آید: «three major advantages». در فارسی «سه مزیت» مفرد است و برای همین گاهی «s» جا می‌افتد. این جمله یک Topic Sentence استاندارد است: موضوع + ایدهٔ کنترل‌کننده.",
        "chunks": [
          "Online dictionaries offer",
          "three major",
          "advantage",
          "for EFL university students."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "advantages",
        "flawedSentence": "Online dictionaries offer three major advantage for EFL university students.",
        "matchLeft": "اجزای Topic Sentence",
        "matchRight": "Topic + Controlling Idea",
        "noTyping": true
      },
      {
        "id": "v3_l2_8",
        "lesson": 2,
        "ruleTag": "تشخیص who پس از عبارت معترضه",
        "sentence": "The young inventor, who won the gold medal last week, lives in Mashhad.",
        "target": "who",
        "cloze": "The young inventor, _____ won the gold medal last week, lives in Mashhad.",
        "promptHint": "relative subject",
        "options": [
          "who",
          "whom",
          "which",
          "where"
        ],
        "fa": "مخترع جوانی که هفته گذشته مدال طلا برد، در مشهد زندگی می‌کند.",
        "explainFa": "مرجع «inventor» انسان است و بلافاصله پس از جای خالی فعل «won» آمده است ← فاعلی «who».",
        "chunks": [
          "The young inventor,",
          "whom",
          "won the gold medal",
          "last week, lives in Mashhad."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "who",
        "flawedSentence": "The young inventor, whom won the gold medal last week, lives in Mashhad.",
        "matchLeft": "انسان + ___ + won/passed",
        "matchRight": "who",
        "noTyping": true
      },
      {
        "id": "v3_l2_9",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم — بخش نتیجه با would",
        "sentence": "If people used public transport more often, big cities would have cleaner air.",
        "target": "would have",
        "cloze": "If people used public transport more often, big cities _____ cleaner air.",
        "promptHint": "Type 2 result",
        "options": [
          "would have",
          "will have",
          "had",
          "have"
        ],
        "fa": "اگر مردم بیشتر از حمل‌ونقل عمومی استفاده می‌کردند، شهرهای بزرگ هوای پاک‌تری می‌داشتند.",
        "explainFa": "چون فعل شرط گذشته ساده «used» است (شرطی نوع دوم)، در بخش نتیجه «would + فعل ساده (have)» می‌آید.",
        "chunks": [
          "If people used public",
          "transport more often, big cities",
          "will have",
          "cleaner air."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "would have",
        "flawedSentence": "If people used public transport more often, big cities will have cleaner air.",
        "matchLeft": "If + Past (___)",
        "matchRight": "would / could + V",
        "noTyping": true
      },
      {
        "id": "v3_l3_1",
        "lesson": 3,
        "ruleTag": "گذشته کامل پس از After",
        "sentence": "After the engineers had tested the solar panels carefully, they connected them to the grid.",
        "target": "had tested",
        "cloze": "After the engineers _____ the solar panels carefully, they connected them to the grid.",
        "promptHint": "after + had P.P.",
        "options": [
          "had tested",
          "has tested",
          "have tested",
          "test"
        ],
        "fa": "پس از آنکه مهندسان پنل‌های خورشیدی را با دقت آزمایش کرده بودند، آن‌ها را به شبکه متصل کردند.",
        "explainFa": "طبق الگوی «After + عمل اول، عمل دوم در گذشته (connected)»، عمل اول گذشته کامل «had tested» است.",
        "chunks": [
          "After the engineers",
          "has tested",
          "the solar panels carefully, they",
          "connected them to the grid."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had tested",
        "flawedSentence": "After the engineers has tested the solar panels carefully, they connected them to the grid.",
        "matchLeft": "After + ___ , Simple Past",
        "matchRight": "had + P.P."
      },
      {
        "id": "v3_l3_2",
        "lesson": 3,
        "ruleTag": "گذشته کامل با Before",
        "sentence": "The villagers had stored enough clean water before the dry season began.",
        "target": "had stored",
        "cloze": "The villagers _____ enough clean water before the dry season began.",
        "promptHint": "before + past simple",
        "options": [
          "had stored",
          "have stored",
          "store",
          "are storing"
        ],
        "fa": "روستاییان پیش از آنکه فصل خشک آغاز شود، به مقدار کافی آب پاک ذخیره کرده بودند.",
        "explainFa": "همراه «before + گذشته ساده (began)»، کاری که زودتر تمام شده با ماضی بعید «had stored» بیان می‌شود.",
        "chunks": [
          "The villagers",
          "have stored",
          "enough clean water before",
          "the dry season began."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had stored",
        "flawedSentence": "The villagers have stored enough clean water before the dry season began.",
        "matchLeft": "___ + before + Past Simple",
        "matchRight": "had + P.P.",
        "noTyping": true
      },
      {
        "id": "v3_l3_3",
        "lesson": 3,
        "ruleTag": "گذشته کامل برای بیان علت در گذشته (because)",
        "sentence": "Reza answered all the final exam questions easily because he had practiced every grammar pattern.",
        "target": "had practiced",
        "cloze": "Reza answered all the final exam questions easily because he _____ every grammar pattern.",
        "promptHint": "because + had P.P.",
        "options": [
          "had practiced",
          "has practiced",
          "had practice",
          "is practicing"
        ],
        "fa": "رضا به همه پرسش‌های امتحان نهایی به‌آسانی پاسخ داد، زیرا تمام الگوهای گرامری را تمرین کرده بود.",
        "explainFa": "وقتی نتیجه در گذشته (answered) است، علتِ مقدم بر آن با «because + had practiced» می‌آید.",
        "chunks": [
          "Reza answered all the final",
          "exam questions easily because he",
          "has practiced",
          "every grammar pattern."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "had practiced",
        "flawedSentence": "Reza answered all the final exam questions easily because he has practiced every grammar pattern.",
        "matchLeft": "Past Simple + because +",
        "matchRight": "had + P.P."
      },
      {
        "id": "v3_l3_4",
        "lesson": 3,
        "ruleTag": "گذشته کامل با By the time",
        "sentence": "By the time the firefighters reached the power plant, the automatic system had put out the fire.",
        "target": "had put",
        "cloze": "By the time the firefighters reached the power plant, the automatic system _____ out the fire.",
        "promptHint": "by the time",
        "options": [
          "had put",
          "has put",
          "puts",
          "will put"
        ],
        "fa": "تا زمانی که آتش‌نشانان به نیروگاه رسیدند، سامانه خودکار آتش را خاموش کرده بود.",
        "explainFa": "الگوی کلیدی امتحان نهایی: «By the time + گذشته ساده (reached)، had + P.P. (had put)».",
        "chunks": [
          "By the time the firefighters reached",
          "the power plant, the automatic system",
          "has put",
          "out the fire."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "had put",
        "flawedSentence": "By the time the firefighters reached the power plant, the automatic system has put out the fire.",
        "matchLeft": "By the time + Past",
        "matchRight": "had + P.P.",
        "noTyping": true
      },
      {
        "id": "v3_l3_5",
        "lesson": 3,
        "ruleTag": "تشخیص عمل دوم در گذشته ساده",
        "sentence": "When I turned on the television, the documentary on wind energy had already finished.",
        "target": "turned on",
        "cloze": "When I _____ the television, the documentary on wind energy had already finished.",
        "promptHint": "when + past simple",
        "options": [
          "turned on",
          "have turned on",
          "turning on",
          "turn on"
        ],
        "fa": "وقتی تلویزیون را روشن کردم، مستند انرژی بادی قبلاً تمام شده بود.",
        "explainFa": "در این جمله رویداد زودتر با «had already finished» و رویداد بعدی با گذشتهٔ سادهٔ «turned on» بیان شده است.",
        "chunks": [
          "When I",
          "have turned on",
          "the television, the documentary on",
          "wind energy had already finished."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "turned on",
        "flawedSentence": "When I have turned on the television, the documentary on wind energy had already finished.",
        "matchLeft": "When + ___ , had P.P.",
        "matchRight": "گذشته ساده (عمل دوم)",
        "noTyping": true
      },
      {
        "id": "v3_l3_6",
        "lesson": 3,
        "ruleTag": "Writing: جملات پشتیبان و نتیجه‌گیری پاراگراف",
        "sentence": "In short, replacing fossil fuels with solar and wind power protects our planet for future generations.",
        "target": "In short,",
        "cloze": "_____ replacing fossil fuels with solar and wind power protects our planet for future generations.",
        "promptHint": "concluding signal",
        "options": [
          "In short,",
          "Because of",
          "Although",
          "Despite"
        ],
        "fa": "به‌طور خلاصه، جایگزین کردن سوخت‌های فسیلی با انرژی خورشیدی و بادی، سیاره ما را برای نسل‌های آینده حفظ می‌کند.",
        "explainFa": "«In short,» جملهٔ نتیجه‌گیری پاراگراف را شروع می‌کند و بعدش یک جملهٔ کامل می‌آید. «Because of / Despite» حرف اضافه‌اند و «Although» جمله را ناقص می‌کند؛ هیچ‌کدام نمی‌تواند این جمله را شروع کند.",
        "chunks": [
          "Because of",
          "replacing fossil fuels with",
          "solar and wind power",
          "protects our planet",
          "for future generations."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "In short,",
        "flawedSentence": "Because of replacing fossil fuels with solar and wind power protects our planet for future generations.",
        "matchLeft": "نشانه جمله پایانی پاراگراف",
        "matchRight": "In short, / To sum up,",
        "noTyping": true
      },
      {
        "id": "v3_l3_7",
        "lesson": 3,
        "ruleTag": "مجهول گذشته کامل (تلفیقی درس ۱ و ۳)",
        "sentence": "All the tickets had been sold before we got to the theater.",
        "target": "had been sold",
        "cloze": "All the tickets _____ before we got to the theater.",
        "promptHint": "sell — past perf. passive",
        "options": [
          "had been sold",
          "had sold",
          "have been sold",
          "were sell"
        ],
        "fa": "پیش از آنکه به سالن تئاتر برسیم، تمام بلیت‌ها فروخته شده بود.",
        "explainFa": "برای نشان‌دادن کامل‌شدن فروش پیش از رسیدن، مجهول گذشتهٔ کامل «had been sold» مناسب است؛ در بعضی بافت‌ها گذشتهٔ ساده نیز ممکن است.",
        "chunks": [
          "All the tickets",
          "had sold",
          "before we got",
          "to the theater."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had been sold",
        "flawedSentence": "All the tickets had sold before we got to the theater.",
        "matchLeft": "مجهولِ ماضی بعید",
        "matchRight": "had been + P.P."
      },
      {
        "id": "v3_l3_8",
        "lesson": 3,
        "ruleTag": "گذشته کامل منفی hadn't seen",
        "sentence": "Sina didn't recognize his cousin because he hadn't seen him for ten years.",
        "target": "hadn't seen",
        "cloze": "Sina didn't recognize his cousin because he _____ him for ten years.",
        "promptHint": "negative past perf.",
        "options": [
          "hadn't seen",
          "hasn't seen",
          "hadn't saw",
          "doesn't see"
        ],
        "fa": "سینا پسرعمویش را نشناخت چون ده سال بود که او را ندیده بود.",
        "explainFa": "علتِ مقدم بر گذشته (didn't recognize) به همراه «for ten years» در بستر گذشته ← ماضی بعید منفی «hadn't seen».",
        "chunks": [
          "Sina didn't recognize his",
          "cousin because he",
          "hasn't seen",
          "him for ten years."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "hadn't seen",
        "flawedSentence": "Sina didn't recognize his cousin because he hasn't seen him for ten years.",
        "matchLeft": "علت منفی پیش از گذشته",
        "matchRight": "hadn't + P.P.",
        "noTyping": true
      },
      {
        "id": "v3_l3_9",
        "lesson": 3,
        "ruleTag": "Writing: پرهیز از اطلاعات بی‌ربط در Supporting Sentences",
        "sentence": "Every supporting sentence in a paragraph must directly explain the topic sentence.",
        "target": "explain",
        "cloze": "Every supporting sentence in a paragraph must directly _____ the topic sentence.",
        "promptHint": "must + base verb",
        "options": [
          "explain",
          "explains",
          "to explain",
          "explaining"
        ],
        "fa": "هر جملهٔ پشتیبان در پاراگراف باید مستقیماً جملهٔ موضوع را توضیح دهد.",
        "explainFa": "بعد از «must» فعل ساده می‌آید: «must explain». اصل وحدت پاراگراف (Unity): هر جملهٔ پشتیبان باید مستقیماً در خدمت «topic sentence» باشد و ایدهٔ بی‌ربط نیاورد.",
        "chunks": [
          "Every supporting sentence in",
          "a paragraph must directly",
          "explains",
          "the topic sentence."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "explain",
        "flawedSentence": "Every supporting sentence in a paragraph must directly explains the topic sentence.",
        "matchLeft": "وظیفه Supporting Sentences",
        "matchRight": "اثبات Topic Sentence",
        "noTyping": true
      },
      {
        "id": "v3_l1_12",
        "lesson": 1,
        "ruleTag": "مجهول گذشته ساده با were",
        "sentence": "The windows of our classroom were cleaned yesterday.",
        "target": "were",
        "cloze": "The windows of our classroom _____ cleaned yesterday.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "are",
          "have been"
        ],
        "fa": "پنجره‌های کلاس ما دیروز تمیز شدند.",
        "explainFa": "«windows» جمع است، پس در گذشته «were» می‌آید.",
        "chunks": [
          "The windows of",
          "our classroom",
          "was",
          "cleaned yesterday."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "were",
        "flawedSentence": "The windows of our classroom was cleaned yesterday.",
        "matchLeft": "The windows of our classroom",
        "matchRight": "were cleaned yesterday"
      },
      {
        "id": "v3_l1_13",
        "lesson": 1,
        "ruleTag": "مجهول آینده با be going to",
        "sentence": "A new school is going to be built in our town.",
        "target": "school",
        "cloze": "A new _____ is going to be built in our town.",
        "promptHint": "school (شکل درست)",
        "options": [
          "school",
          "schools",
          "schooles",
          "school's"
        ],
        "fa": "یک مدرسهٔ جدید در شهر ما ساخته خواهد شد.",
        "explainFa": "بعد از «a» باید اسم مفرد بیاید.",
        "chunks": [
          "A new",
          "schools",
          "is going to be",
          "built in our town."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "school",
        "flawedSentence": "A new schools is going to be built in our town.",
        "matchLeft": "A new",
        "matchRight": "school is going to be built"
      },
      {
        "id": "v3_l1_14",
        "lesson": 1,
        "ruleTag": "مجهول با اسم مفرد",
        "sentence": "The famous poem was written by a young poet.",
        "target": "poem",
        "cloze": "The famous _____ was written by a young poet.",
        "promptHint": "poem (شکل درست)",
        "options": [
          "poem",
          "poems",
          "poet",
          "poem's"
        ],
        "fa": "آن شعر مشهور را یک شاعر جوان نوشت.",
        "explainFa": "در ساختار مجهول، اسم مفرد با «was» به‌کار می‌رود.",
        "chunks": [
          "The famous",
          "poems",
          "was written by",
          "a young poet."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "poem",
        "flawedSentence": "The famous poems was written by a young poet.",
        "matchLeft": "The famous",
        "matchRight": "poem was written"
      },
      {
        "id": "v3_l1_15",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن با are",
        "sentence": "You are invited to the ceremony, aren't you?",
        "target": "are",
        "cloze": "You _____ invited to the ceremony, aren't you?",
        "promptHint": "be",
        "options": [
          "are",
          "were",
          "is",
          "being"
        ],
        "fa": "تو به مراسم دعوت شده‌ای، مگر نه؟",
        "explainFa": "تگ «aren't you» نشان می‌دهد فعل جملهٔ اصلی «are» است؛ «were» با تگ «aren't» جور نیست (were → weren't).",
        "chunks": [
          "You",
          "were",
          "invited to the",
          "ceremony, aren't you?"
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "are",
        "flawedSentence": "You were invited to the ceremony, aren't you?",
        "matchLeft": "You",
        "matchRight": "are invited to the ceremony"
      },
      {
        "id": "v3_l1_16",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن مثبت با isn't",
        "sentence": "He is a diligent student, isn't he?",
        "target": "isn't",
        "cloze": "He is a diligent student, _____ he?",
        "promptHint": "is",
        "options": [
          "isn't",
          "is",
          "aren't",
          "don't"
        ],
        "fa": "او دانش‌آموز سخت‌کوشی است، مگر نه؟",
        "explainFa": "جملهٔ مثبت، تگ منفی مثل «isn't he» می‌گیرد.",
        "chunks": [
          "He is a",
          "diligent student,",
          "is",
          "he?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "isn't",
        "flawedSentence": "He is a diligent student, is he?",
        "matchLeft": "He is a diligent student",
        "matchRight": "isn't he",
        "noTyping": true
      },
      {
        "id": "v3_l1_17",
        "lesson": 1,
        "ruleTag": "تگ‌کوئسچن با have و haven't",
        "sentence": "They have already finished the project, haven't they?",
        "target": "haven't",
        "cloze": "They have already finished the project, _____ they?",
        "promptHint": "have",
        "options": [
          "haven't",
          "have",
          "didn't",
          "wasn't"
        ],
        "fa": "آن‌ها پروژه را تمام کرده‌اند، مگر نه؟",
        "explainFa": "در جملهٔ «They have ...» تگ «haven't they» می‌آید.",
        "chunks": [
          "They have already",
          "finished the project,",
          "have",
          "they?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "haven't",
        "flawedSentence": "They have already finished the project, have they?",
        "matchLeft": "They have already finished the project",
        "matchRight": "haven't they"
      },
      {
        "id": "v3_l1_18",
        "lesson": 1,
        "ruleTag": "Writing: جملهٔ مرکب نتیجه‌گیری با so",
        "sentence": "The exam was hard, so I could not finish it.",
        "target": "so",
        "cloze": "The exam was hard, _____ I could not finish it.",
        "promptHint": "so",
        "options": [
          "so",
          "but",
          "or",
          "because"
        ],
        "fa": "امتحان سخت بود، بنابراین نتوانستم تمامش کنم.",
        "explainFa": "با «so» نتیجهٔ جملهٔ پیشین بیان می‌شود.",
        "chunks": [
          "The exam was hard,",
          "but",
          "I could not",
          "finish it."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "so",
        "flawedSentence": "The exam was hard, but I could not finish it.",
        "matchLeft": "The exam was hard",
        "matchRight": "so I could not finish it",
        "noTyping": true
      },
      {
        "id": "v3_l1_19",
        "lesson": 1,
        "ruleTag": "Writing: جملهٔ مرکب با or به معنی وگرنه",
        "sentence": "Hurry up, or you will miss the school bus.",
        "target": "or",
        "cloze": "Hurry up, _____ you will miss the school bus.",
        "promptHint": "or",
        "options": [
          "or",
          "and",
          "so",
          "but"
        ],
        "fa": "عجله کن، وگرنه به سرویس مدرسه نمی‌رسی.",
        "explainFa": "«or» در اینجا یعنی «وگرنه» و نتیجهٔ انجام‌ندادن کار را می‌گوید: «Hurry up, or you will miss the bus».",
        "chunks": [
          "Hurry up,",
          "and",
          "you will miss",
          "the school bus."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "or",
        "flawedSentence": "Hurry up, and you will miss the school bus.",
        "matchLeft": "Hurry up,",
        "matchRight": "or you will miss the school bus",
        "noTyping": true
      },
      {
        "id": "v3_l1_20",
        "lesson": 1,
        "ruleTag": "مجهول با اسم جمع",
        "sentence": "The prizes were given to the winners.",
        "target": "prizes",
        "cloze": "The _____ were given to the winners.",
        "promptHint": "prize",
        "options": [
          "prizes",
          "prize",
          "prizes'",
          "prize'"
        ],
        "fa": "جوایز به برندگان داده شد.",
        "explainFa": "«prizes» جمع است و با «were» می‌آید.",
        "chunks": [
          "The",
          "prize",
          "were given to",
          "the winners."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "prizes",
        "flawedSentence": "The prize were given to the winners.",
        "matchLeft": "The",
        "matchRight": "prizes were given to the winners"
      },
      {
        "id": "v3_l2_11",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی فاعلی با who",
        "sentence": "The teacher who teaches us grammar lives in Mashhad.",
        "target": "who",
        "cloze": "The teacher _____ teaches us grammar lives in Mashhad.",
        "promptHint": "who / which",
        "options": [
          "who",
          "which",
          "whom",
          "what"
        ],
        "fa": "معلمی که به ما گرامر درس می‌دهد در مشهد زندگی می‌کند.",
        "explainFa": "مرجع انسان و دارای فعل است، پس «who» درست است.",
        "chunks": [
          "The teacher",
          "which",
          "teaches us grammar",
          "lives in Mashhad."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "who",
        "flawedSentence": "The teacher which teaches us grammar lives in Mashhad.",
        "matchLeft": "The teacher",
        "matchRight": "who teaches us grammar",
        "altAnswers": [
          "that"
        ]
      },
      {
        "id": "v3_l2_12",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی مفعولی غیرانسان با which",
        "sentence": "The book which you gave me is very useful.",
        "target": "which",
        "cloze": "The book _____ you gave me is very useful.",
        "promptHint": "who / which",
        "options": [
          "which",
          "who",
          "whom",
          "whose"
        ],
        "fa": "کتابی که به من دادی خیلی مفید است.",
        "explainFa": "مرجع غیرانسان است، پس «which» به‌کار می‌رود.",
        "chunks": [
          "The book",
          "who",
          "you gave me",
          "is very useful."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "which",
        "flawedSentence": "The book who you gave me is very useful.",
        "matchLeft": "The book",
        "matchRight": "which you gave me",
        "altAnswers": [
          "that"
        ]
      },
      {
        "id": "v3_l2_13",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی مالکیت whose",
        "sentence": "He is the man whose brother is a pilot.",
        "target": "whose",
        "cloze": "He is the man _____ brother is a pilot.",
        "promptHint": "who / whose",
        "options": [
          "whose",
          "who his",
          "whom",
          "who"
        ],
        "fa": "او همان مردی است که برادرش خلبان است.",
        "explainFa": "«whose» خودش مالکیت را نشان می‌دهد و بعدش اسم بدون ضمیر می‌آید: «whose brother». در فارسی می‌گوییم «مردی که برادرش…»؛ برای همین گاهی «who his brother» می‌نویسیم که غلط است.",
        "chunks": [
          "He is",
          "the man",
          "who his",
          "brother is a pilot."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "whose",
        "flawedSentence": "He is the man who his brother is a pilot.",
        "matchLeft": "He is the man",
        "matchRight": "whose brother is a pilot"
      },
      {
        "id": "v3_l2_14",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم با were برای I",
        "sentence": "If I were in your position, I would study grammar every day.",
        "target": "were",
        "cloze": "If I _____ in your position, I would study grammar every day.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "am",
          "will be"
        ],
        "fa": "اگر جای تو بودم، هر روز گرامر می‌خواندم.",
        "explainFa": "در شرطیِ خلاف واقع (جواب با would) در نوشتار رسمی و امتحان برای همهٔ فاعل‌ها «were» می‌آید: «If I were in your position»؛ «If I was» در این معنا محاوره‌ای است.",
        "chunks": [
          "If I",
          "was",
          "in your position, I would",
          "study grammar every day."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "If I was in your position, I would study grammar every day.",
        "matchLeft": "If I",
        "matchRight": "were in your position",
        "informalAnswers": [
          {
            "f": "was",
            "n": "«if i was» در شرطیِ خلاف واقع در گفتار رایج است، اما در نوشتار رسمی (معیار امتحان) «were» می‌آید."
          }
        ]
      },
      {
        "id": "v3_l2_15",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم — فعل شرط در گذشته",
        "sentence": "If he studied harder, he would pass the test.",
        "target": "studied",
        "cloze": "If he _____ harder, he would pass the test.",
        "promptHint": "study",
        "options": [
          "studied",
          "studies",
          "study",
          "will study"
        ],
        "fa": "اگر سخت‌تر درس می‌خواند، در آزمون قبول می‌شد.",
        "explainFa": "در شرطی نوع دوم، فعل شرط گذشته ساده مثل «studied» است.",
        "chunks": [
          "If he",
          "studies",
          "harder, he would",
          "pass the test."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "studied",
        "flawedSentence": "If he studies harder, he would pass the test.",
        "matchLeft": "If he",
        "matchRight": "studied harder"
      },
      {
        "id": "v3_l2_16",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم با فاعل جمع",
        "sentence": "If we planted more trees, the air would be cleaner.",
        "target": "planted",
        "cloze": "If we _____ more trees, the air would be cleaner.",
        "promptHint": "plant",
        "options": [
          "planted",
          "plant",
          "plants",
          "will plant"
        ],
        "fa": "اگر درخت‌های بیشتری می‌کاشتیم، هوا پاک‌تر می‌شد.",
        "explainFa": "فعل شرط در گذشته ساده مثل «planted» می‌آید.",
        "chunks": [
          "If we",
          "plant",
          "more trees, the air",
          "would be cleaner."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "planted",
        "flawedSentence": "If we plant more trees, the air would be cleaner.",
        "matchLeft": "If we",
        "matchRight": "planted more trees"
      },
      {
        "id": "v3_l2_17",
        "lesson": 2,
        "ruleTag": "ضمیر موصولی با that برای اشیا",
        "sentence": "The website which explains grammar rules is very clear.",
        "target": "which",
        "cloze": "The website _____ explains grammar rules is very clear.",
        "promptHint": "who / which",
        "options": [
          "which",
          "who",
          "whom",
          "what"
        ],
        "fa": "وب‌سایتی که قواعد گرامر را توضیح می‌دهد خیلی روشن است.",
        "explainFa": "برای اشیا (website) ضمیر موصولی «which / that» می‌آید؛ «who» فقط برای انسان است.",
        "chunks": [
          "The website",
          "who",
          "explains grammar rules",
          "is very clear."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "which",
        "flawedSentence": "The website who explains grammar rules is very clear.",
        "matchLeft": "The website which",
        "matchRight": "explains grammar rules",
        "altAnswers": [
          "that"
        ]
      },
      {
        "id": "v3_l2_18",
        "lesson": 2,
        "ruleTag": "ضمیر اشارهٔ Those who به معنی کسانی که",
        "sentence": "Those who study hard always succeed.",
        "target": "Those",
        "cloze": "_____ who study hard always succeed.",
        "promptHint": "those who",
        "options": [
          "Those",
          "Them",
          "This",
          "That"
        ],
        "fa": "کسانی که سخت درس می‌خوانند همیشه موفق می‌شوند.",
        "explainFa": "برای «کسانی که» در انگلیسی «Those who» می‌گوییم؛ «Them who» غلط است.",
        "chunks": [
          "Them",
          "who study",
          "hard",
          "always",
          "succeed."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Those",
        "flawedSentence": "Them who study hard always succeed.",
        "matchLeft": "Those who",
        "matchRight": "study hard always succeed"
      },
      {
        "id": "v3_l2_19",
        "lesson": 2,
        "ruleTag": "شرطی نوع دوم با آرزوی شغلی",
        "sentence": "If I were a doctor, I would help people in rural areas.",
        "target": "were",
        "cloze": "If I _____ a doctor, I would help people in rural areas.",
        "promptHint": "be",
        "options": [
          "were",
          "was",
          "am",
          "is"
        ],
        "fa": "اگر پزشک بودم، به مردم روستا کمک می‌کردم.",
        "explainFa": "در شرطیِ خلاف واقع (جواب با would) در نوشتار رسمی برای «I» هم «were» می‌آید: «If I were a doctor»؛ «If I was» در این معنا محاوره‌ای است.",
        "chunks": [
          "If I",
          "was",
          "a doctor, I would help",
          "people in rural areas."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "were",
        "flawedSentence": "If I was a doctor, I would help people in rural areas.",
        "matchLeft": "If I",
        "matchRight": "were a doctor",
        "informalAnswers": [
          {
            "f": "was",
            "n": "«if i was» در شرطیِ خلاف واقع در گفتار رایج است، اما در نوشتار رسمی (معیار امتحان) «were» می‌آید."
          }
        ]
      },
      {
        "id": "v3_l2_20",
        "lesson": 2,
        "ruleTag": "Writing: ضمیر موصولی در جملهٔ موضوع",
        "sentence": "Online dictionaries, which provide clear examples, are very useful.",
        "target": "which",
        "cloze": "Online dictionaries, _____ provide clear examples, are very useful.",
        "promptHint": "who / which",
        "options": [
          "which",
          "who",
          "whom",
          "what"
        ],
        "fa": "فرهنگ‌لغت‌های اینترنتی که مثال‌های روشن ارائه می‌دهند، خیلی مفیدند.",
        "explainFa": "ضمیر موصولی غیرانسان «which» است.",
        "chunks": [
          "Online dictionaries,",
          "who",
          "provide clear examples,",
          "are very useful."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "which",
        "flawedSentence": "Online dictionaries, who provide clear examples, are very useful.",
        "matchLeft": "Online dictionaries",
        "matchRight": "which provide clear examples"
      },
      {
        "id": "v3_l3_10",
        "lesson": 3,
        "ruleTag": "گذشته کامل با After و عمل اول",
        "sentence": "After she had finished the course, she got a good job.",
        "target": "had finished",
        "cloze": "After she _____ the course, she got a good job.",
        "promptHint": "finish",
        "options": [
          "had finished",
          "finishes",
          "has finished",
          "finish"
        ],
        "fa": "بعد از اینکه دوره را تمام کرد، شغل خوبی پیدا کرد.",
        "explainFa": "در این مثال رویداد زودتر با «had finished» بیان شده است؛ با «after» گذشتهٔ سادهٔ «finished» هم می‌تواند درست باشد.",
        "chunks": [
          "After she",
          "finishes",
          "the course, she got",
          "a good job."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had finished",
        "flawedSentence": "After she finishes the course, she got a good job.",
        "matchLeft": "After she",
        "matchRight": "had finished the course",
        "altAnswers": [
          "finished"
        ]
      },
      {
        "id": "v3_l3_11",
        "lesson": 3,
        "ruleTag": "گذشته کامل در because",
        "sentence": "Because he had studied hard, he passed the exam easily.",
        "target": "had studied",
        "cloze": "Because he _____ hard, he passed the exam easily.",
        "promptHint": "study",
        "options": [
          "had studied",
          "had study",
          "has studied",
          "study"
        ],
        "fa": "چون سخت درس خوانده بود، به‌راحتی در امتحان قبول شد.",
        "explainFa": "در این مثال «had studied» علت مقدم در گذشته را نشان می‌دهد؛ «studied» نیز در چنین بافتی می‌تواند درست باشد.",
        "chunks": [
          "Because he",
          "has studied",
          "hard, he passed",
          "the exam easily."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had studied",
        "flawedSentence": "Because he has studied hard, he passed the exam easily.",
        "matchLeft": "Because he",
        "matchRight": "had studied hard",
        "altAnswers": [
          "studied"
        ]
      },
      {
        "id": "v3_l3_12",
        "lesson": 3,
        "ruleTag": "گذشته کامل با When",
        "sentence": "When I arrived, the lecture had already started.",
        "target": "had",
        "cloze": "When I arrived, the lecture _____ already started.",
        "promptHint": "have",
        "options": [
          "had",
          "has",
          "have",
          "is"
        ],
        "fa": "وقتی رسیدم، سخنرانی قبلاً شروع شده بود.",
        "explainFa": "عمل زودتر با «had + P.P.» بیان می‌شود.",
        "chunks": [
          "When I arrived,",
          "the lecture",
          "has",
          "already started."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "had",
        "flawedSentence": "When I arrived, the lecture has already started.",
        "matchLeft": "When I arrived",
        "matchRight": "the lecture had already started"
      },
      {
        "id": "v3_l3_13",
        "lesson": 3,
        "ruleTag": "گذشته کامل با Before و عمل اول",
        "sentence": "They had found the answer before the teacher asked the question.",
        "target": "had found",
        "cloze": "They _____ the answer before the teacher asked the question.",
        "promptHint": "find",
        "options": [
          "had found",
          "find",
          "finds",
          "have found"
        ],
        "fa": "آن‌ها پیش از آنکه معلم سؤال بپرسد، پاسخ را یافته بودند.",
        "explainFa": "در این مثال «had found» تقدم زمانی را برجسته می‌کند؛ با «before»، شکل گذشتهٔ سادهٔ «found» هم می‌تواند درست باشد.",
        "chunks": [
          "They",
          "find",
          "the answer before the",
          "teacher asked the question."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had found",
        "flawedSentence": "They find the answer before the teacher asked the question.",
        "matchLeft": "They",
        "matchRight": "had found the answer",
        "altAnswers": [
          "found"
        ]
      },
      {
        "id": "v3_l3_14",
        "lesson": 3,
        "ruleTag": "ماضی بعید مجهول با By the time",
        "sentence": "By the time we arrived, the project had already been finished.",
        "target": "had",
        "cloze": "By the time we arrived, the project _____ already been finished.",
        "promptHint": "have (شکل درست)",
        "options": [
          "had",
          "has",
          "have",
          "was"
        ],
        "fa": "تا زمانی که رسیدیم، پروژه تمام شده بود.",
        "explainFa": "«By the time» + گذشتهٔ ساده نشان می‌دهد کار قبل از آن تمام شده بود: «had already been finished» (ماضی بعید مجهول).",
        "chunks": [
          "By the time we",
          "arrived, the project",
          "has",
          "already been finished."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "had",
        "flawedSentence": "By the time we arrived, the project has already been finished.",
        "matchLeft": "By the time we arrived, the project",
        "matchRight": "had already been finished"
      },
      {
        "id": "v3_l3_15",
        "lesson": 3,
        "ruleTag": "گذشته کامل منفی با had never",
        "sentence": "She had never visited Europe before that trip.",
        "target": "had",
        "cloze": "She _____ never visited Europe before that trip.",
        "promptHint": "have",
        "options": [
          "had",
          "has",
          "have",
          "was"
        ],
        "fa": "او قبل از آن سفر هرگز به اروپا نرفته بود.",
        "explainFa": "در منفی گذشتهٔ کامل از «had never» استفاده می‌کنیم.",
        "chunks": [
          "She",
          "has",
          "never visited Europe",
          "before that trip."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had",
        "flawedSentence": "She has never visited Europe before that trip.",
        "matchLeft": "She",
        "matchRight": "had never visited Europe"
      },
      {
        "id": "v3_l3_16",
        "lesson": 3,
        "ruleTag": "Writing: جملهٔ پشتیبان با Although",
        "sentence": "Although she had studied abroad, she could not find a job.",
        "target": "Although",
        "cloze": "_____ she had studied abroad, she could not find a job.",
        "promptHint": "although",
        "options": [
          "Although",
          "Despite",
          "So",
          "But"
        ],
        "fa": "اگرچه در خارج از کشور درس خوانده بود، نتوانست کاری پیدا کند.",
        "explainFa": "«Although» + جملهٔ کامل تضاد را نشان می‌دهد؛ «Despite» حرف اضافه است و بعدش جمله نمی‌آید (Despite + اسم / -ing).",
        "chunks": [
          "Despite",
          "she had studied",
          "abroad, she could",
          "not find",
          "a job."
        ],
        "wrongChunkIdx": 0,
        "fixedChunk": "Although",
        "flawedSentence": "Despite she had studied abroad, she could not find a job.",
        "matchLeft": "Although",
        "matchRight": "she had studied abroad",
        "noTyping": true
      },
      {
        "id": "v3_l3_17",
        "lesson": 3,
        "ruleTag": "Writing: جملهٔ موضوع در پاراگراف",
        "sentence": "The topic sentence explains the main idea of the paragraph.",
        "target": "topic",
        "cloze": "The _____ sentence explains the main idea of the paragraph.",
        "promptHint": "topic (شکل درست)",
        "options": [
          "topic",
          "topics",
          "topic's",
          "topical"
        ],
        "fa": "جملهٔ موضوع، ایدهٔ اصلی پاراگراف را توضیح می‌دهد.",
        "explainFa": "در نوشتن پاراگراف، جملهٔ اول «topic sentence» است.",
        "chunks": [
          "The",
          "topics",
          "sentence explains the main",
          "idea of the paragraph."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "topic",
        "flawedSentence": "The topics sentence explains the main idea of the paragraph.",
        "matchLeft": "The",
        "matchRight": "topic sentence explains"
      },
      {
        "id": "v3_l3_18",
        "lesson": 3,
        "ruleTag": "Writing: نتیجه‌گیری پاراگراف",
        "sentence": "In conclusion, regular daily practice leads to real progress.",
        "target": "leads",
        "cloze": "In conclusion, regular daily practice _____ to real progress.",
        "promptHint": "lead (شکل درست)",
        "options": [
          "leads",
          "lead",
          "leading",
          "are leading"
        ],
        "fa": "در نتیجه، تمرین منظم روزانه به پیشرفت واقعی می‌انجامد.",
        "explainFa": "فاعل «regular daily practice» مفرد و غیرقابل‌شمارش است، پس فعل «s» می‌گیرد: «leads». «In conclusion» جملهٔ نتیجه‌گیری پاراگراف را شروع می‌کند.",
        "chunks": [
          "In conclusion, regular",
          "daily practice",
          "lead",
          "to real progress."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "leads",
        "flawedSentence": "In conclusion, regular daily practice lead to real progress.",
        "matchLeft": "In conclusion, regular daily practice",
        "matchRight": "leads to real progress"
      },
      {
        "id": "v3_l3_19",
        "lesson": 3,
        "ruleTag": "گذشته کامل منفی با had not",
        "sentence": "They had not received the results until the evening.",
        "target": "had",
        "cloze": "They _____ not received the results until the evening.",
        "promptHint": "have",
        "options": [
          "had",
          "have",
          "has",
          "was"
        ],
        "fa": "آن‌ها تا عصر نتایج را دریافت نکرده بودند.",
        "explainFa": "در منفی گذشتهٔ کامل «had not» می‌آید.",
        "chunks": [
          "They",
          "have",
          "not received the results",
          "until the evening."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had",
        "flawedSentence": "They have not received the results until the evening.",
        "matchLeft": "They",
        "matchRight": "had not received the results"
      },
      {
        "id": "v3_l3_20",
        "lesson": 3,
        "ruleTag": "گذشته کامل در After با عمل اول",
        "sentence": "After the workers had finished the bridge, the city opened it.",
        "target": "had",
        "cloze": "After the workers _____ finished the bridge, the city opened it.",
        "promptHint": "have",
        "options": [
          "had",
          "have",
          "has",
          "was"
        ],
        "fa": "بعد از اینکه کارگران پل را تمام کردند، شهر آن را افتتاح کرد.",
        "explainFa": "در این نمونه، «had finished» گذشتهٔ کاملِ رویداد اول است؛ پس از «after» همیشه الزاماً گذشتهٔ کامل لازم نیست.",
        "chunks": [
          "After the workers",
          "have",
          "finished the bridge, the",
          "city opened it."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "had",
        "flawedSentence": "After the workers have finished the bridge, the city opened it.",
        "matchLeft": "After the workers",
        "matchRight": "had finished the bridge"
      },
      {
        "id": "v3_l3_21",
        "lesson": 3,
        "ruleTag": "مجهول با should + be + P.P.",
        "sentence": "Plastic bottles should be collected and recycled every week.",
        "target": "should be collected",
        "cloze": "Plastic bottles _____ and recycled every week.",
        "promptHint": "collect — passive",
        "options": [
          "should be collected",
          "should collected",
          "should be collect",
          "should collect"
        ],
        "fa": "بطری‌های پلاستیکی باید هر هفته جمع‌آوری و بازیافت شوند.",
        "explainFa": "مجهول با فعل وجهی = «should + be + P.P.»؛ بطری‌ها جمع‌آوری «می‌شوند»، پس «should be collected» درست است و «be» حذف نمی‌شود (کتاب ص ۸۶).",
        "chunks": [
          "Plastic bottles",
          "should collected",
          "and recycled",
          "every week."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "should be collected",
        "flawedSentence": "Plastic bottles should collected and recycled every week.",
        "matchLeft": "مجهول با should",
        "matchRight": "should be collected"
      },
      {
        "id": "v3_l3_22",
        "lesson": 3,
        "ruleTag": "مجهول با can: تولید برق",
        "sentence": "Clean electricity can be produced from wind and sunlight.",
        "target": "can be produced",
        "cloze": "Clean electricity _____ from wind and sunlight.",
        "promptHint": "produce — passive",
        "options": [
          "can be produced",
          "can produce",
          "can produced",
          "can be produce"
        ],
        "fa": "برق پاک را می‌توان از باد و نور خورشید تولید کرد.",
        "explainFa": "برق «تولید می‌شود» و انجام‌دهنده مهم نیست، پس مجهول با فعل وجهی: «can + be + P.P.» ← «can be produced».",
        "chunks": [
          "Clean electricity",
          "can produce",
          "from wind",
          "and sunlight."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "can be produced",
        "flawedSentence": "Clean electricity can produce from wind and sunlight.",
        "matchLeft": "مجهول با can",
        "matchRight": "can be produced"
      },
      {
        "id": "v3_l3_23",
        "lesson": 3,
        "ruleTag": "مجهول منفی با must not",
        "sentence": "Dangerous batteries must not be thrown into ordinary trash bins.",
        "target": "must not be thrown",
        "cloze": "Dangerous batteries _____ into ordinary trash bins.",
        "promptHint": "throw — passive",
        "options": [
          "must not be thrown",
          "must not throw",
          "must not thrown",
          "must not be throw"
        ],
        "fa": "باتری‌های خطرناک نباید در سطل‌های زبالهٔ معمولی انداخته شوند.",
        "explainFa": "منفیِ مجهول با فعل وجهی: «must not + be + P.P.»؛ اسم مفعولِ throw می‌شود «thrown».",
        "chunks": [
          "Dangerous batteries",
          "must not throw",
          "into ordinary",
          "trash bins."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "must not be thrown",
        "flawedSentence": "Dangerous batteries must not throw into ordinary trash bins.",
        "matchLeft": "مجهول منفی با must",
        "matchRight": "must not be thrown"
      },
      {
        "id": "v3_l3_24",
        "lesson": 3,
        "ruleTag": "مجهول با may (احتمال)",
        "sentence": "A new recycling center may be built near our school next year.",
        "target": "may be built",
        "cloze": "A new recycling center _____ near our school next year.",
        "promptHint": "build — passive",
        "options": [
          "may be built",
          "may build",
          "may built",
          "may be build"
        ],
        "fa": "ممکن است سال آینده یک مرکز بازیافت جدید نزدیک مدرسهٔ ما ساخته شود.",
        "explainFa": "مرکز بازیافت «ساخته می‌شود»؛ احتمال + مجهول ← «may + be + P.P.»: «may be built».",
        "chunks": [
          "A new recycling center",
          "may build",
          "near our school",
          "next year."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "may be built",
        "flawedSentence": "A new recycling center may build near our school next year.",
        "matchLeft": "مجهول با may",
        "matchRight": "may be built"
      },
      {
        "id": "v3_l3_25",
        "lesson": 3,
        "ruleTag": "مجهول با will (آینده)",
        "sentence": "The broken solar panels will be repaired next week.",
        "target": "will be repaired",
        "cloze": "The broken solar panels _____ next week.",
        "promptHint": "repair — passive",
        "options": [
          "will be repaired",
          "will repair",
          "will repaired",
          "will be repair"
        ],
        "fa": "پنل‌های خورشیدیِ خراب هفتهٔ آینده تعمیر خواهند شد.",
        "explainFa": "پنل‌ها «تعمیر می‌شوند»؛ آینده + مجهول ← «will + be + P.P.»: «will be repaired».",
        "chunks": [
          "The broken",
          "solar panels",
          "will repair",
          "next week."
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "will be repaired",
        "flawedSentence": "The broken solar panels will repair next week.",
        "matchLeft": "مجهول با will",
        "matchRight": "will be repaired"
      },
      {
        "id": "v3_l3_26",
        "lesson": 3,
        "ruleTag": "مجهول با should: بازیافت",
        "sentence": "Old newspapers should be recycled to make new paper.",
        "target": "should be recycled",
        "cloze": "Old newspapers _____ to make new paper.",
        "promptHint": "recycle — passive",
        "options": [
          "should be recycled",
          "should recycle",
          "should recycled",
          "should be recycle"
        ],
        "fa": "روزنامه‌های کهنه باید برای ساختن کاغذ نو بازیافت شوند.",
        "explainFa": "روزنامه‌ها خودشان بازیافت نمی‌کنند، بازیافت «می‌شوند»؛ پس «should + be + P.P.» ← «should be recycled».",
        "chunks": [
          "Old newspapers",
          "should recycle",
          "to make",
          "new paper."
        ],
        "wrongChunkIdx": 1,
        "fixedChunk": "should be recycled",
        "flawedSentence": "Old newspapers should recycle to make new paper.",
        "matchLeft": "should + be + P.P. (recycle)",
        "matchRight": "should be recycled"
      },
      {
        "id": "v3_l3_27",
        "lesson": 3,
        "ruleTag": "پرسش در مجهول با can",
        "sentence": "Can plastic be recycled many times?",
        "target": "be recycled",
        "cloze": "Can plastic _____ many times?",
        "promptHint": "recycle — passive",
        "options": [
          "be recycled",
          "recycle",
          "recycled",
          "be recycle"
        ],
        "fa": "آیا پلاستیک را می‌توان چندین بار بازیافت کرد؟",
        "explainFa": "در پرسشِ مجهول با فعل وجهی، فعل وجهی اول می‌آید و بعد از فاعل «be + P.P.»: «Can plastic be recycled…?»",
        "chunks": [
          "Can",
          "plastic",
          "recycle",
          "many times?"
        ],
        "wrongChunkIdx": 2,
        "fixedChunk": "be recycled",
        "flawedSentence": "Can plastic recycle many times?",
        "matchLeft": "پرسش مجهول با Can",
        "matchRight": "Can … be recycled?"
      }
    ],
    "onboarding": {
      "id": "v3_onboard",
      "sentence": "English is spoken in many countries.",
      "cloze": "English _____ spoken in many countries.",
      "target": "is",
      "options": [
        "is",
        "are",
        "has",
        "be"
      ],
      "fa": "زبان انگلیسی در بسیاری از کشورها صحبت می‌شود.",
      "explainFa": "مجهولِ حال ساده: «is + اسم مفعول» ← «is spoken»."
    }
  }
};

window.GRAMMAR_TRANSFORMATIONS = [
  {
    "id": "tf_p1_1",
    "grade": "prospect_1",
    "lesson": 1,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "Her last name is Rahimi.",
    "instructionFa": "با «What» سؤال بسازید:",
    "answerEn": "What is her last name?",
    "altAnswers": [
      "What's her last name?"
    ],
    "options": [
      "What is her last name?",
      "Who is her last name?",
      "What her last name is?",
      "How is her last name?"
    ],
    "explainFa": "برای پرسش از نام خانوادگی، «What» در ابتدا و «is» قبل از «her last name» قرار می‌گیرد."
  },
  {
    "id": "tf_p1_2",
    "grade": "prospect_1",
    "lesson": 4,
    "typeFa": "تصحیح شغل و مالکیت",
    "promptEn": "Reza / father / mechanic. (Possessive 's + a/an)",
    "instructionFa": "با مالکیت ('s)، فعل to be و حرف تعریف درست جمله کامل بسازید:",
    "answerEn": "Reza's father is a mechanic.",
    "altAnswers": [],
    "options": [
      "Reza's father is a mechanic.",
      "Reza father is mechanic.",
      "Reza's father is an mechanic.",
      "Father's Reza is a mechanic."
    ],
    "explainFa": "مالکیت اسم مفرد با «'s» (Reza's father) و شغل مفرد با «a» (a mechanic) ساخته می‌شود."
  },
  {
    "id": "tf_p1_3",
    "grade": "prospect_1",
    "lesson": 5,
    "typeFa": "ترتیب صفات ظاهر",
    "promptEn": "Zahra has hair. (black / long)",
    "instructionFa": "صفات داخل پرانتز را در جایگاه صحیح قرار دهید:",
    "answerEn": "Zahra has long black hair.",
    "altAnswers": [],
    "options": [
      "Zahra has long black hair.",
      "Zahra has black long hair.",
      "Zahra is long black hair.",
      "Zahra has hairs long black."
    ],
    "explainFa": "در توصیف مو از «has» استفاده شده و صفت اندازه (long) قبل از رنگ (black) می‌آید."
  },
  {
    "id": "tf_p1_4",
    "grade": "prospect_1",
    "lesson": 6,
    "typeFa": "تبدیل به حال استمراری",
    "promptEn": "Ali watches TV. (now)",
    "instructionFa": "جمله را با قید «now» به زمان حالِ در حال انجام تبدیل کنید:",
    "answerEn": "Ali is watching TV now.",
    "altAnswers": [
      "Ali's watching TV now."
    ],
    "options": [
      "Ali is watching TV now.",
      "Ali watching TV now.",
      "Ali are watching TV now.",
      "Ali watches TV now."
    ],
    "explainFa": "با افزودن «now»، ساختار «is + watching» جایگزین حال ساده می‌شود."
  },
  {
    "id": "tf_p2_1",
    "grade": "prospect_2",
    "lesson": 1,
    "typeFa": "تبدیل کشور به ملیت",
    "promptEn": "Those players are from Iran.",
    "instructionFa": "حرف اضافه «from» را حذف و جمله را با صفت ملیت بازنویسی کنید:",
    "answerEn": "Those players are Iranian.",
    "altAnswers": [],
    "options": [
      "Those players are Iranian.",
      "Those players are from Iranian.",
      "Those players are Iran.",
      "Those Iranian are players."
    ],
    "explainFa": "با حذف «from»، نام کشور (Iran) به صفت ملیت (Iranian) تبدیل می‌شود."
  },
  {
    "id": "tf_p2_2",
    "grade": "prospect_2",
    "lesson": 3,
    "typeFa": "منفی و سؤالی با can",
    "promptEn": "Sina can swim very fast.",
    "instructionFa": "جمله را به صورت سؤالی کوتاه تبدیل کنید:",
    "answerEn": "Can Sina swim very fast?",
    "altAnswers": [],
    "options": [
      "Can Sina swim very fast?",
      "Does Sina can swim very fast?",
      "Can Sina swims very fast?",
      "Is Sina can swim very fast?"
    ],
    "explainFa": "برای سؤالی کردن «can»، جای Can و فاعل عوض می‌شود و فعل بدون s باقی می‌ماند."
  },
  {
    "id": "tf_p2_3",
    "grade": "prospect_2",
    "lesson": 5,
    "typeFa": "تبدیل مفرد به جمع",
    "promptEn": "There is a green park in our town.",
    "instructionFa": "جمله را با «many» به حالت جمع تبدیل کنید:",
    "answerEn": "There are many green parks in our town.",
    "altAnswers": [],
    "options": [
      "There are many green parks in our town.",
      "There is many green parks in our town.",
      "There are a many green park in our town.",
      "They are many green parks in our town."
    ],
    "explainFa": "در حالت جمع، «There is a park» به «There are many ... parks» تبدیل می‌شود."
  },
  {
    "id": "tf_p2_4",
    "grade": "prospect_2",
    "lesson": 6,
    "typeFa": "تبدیل الگوی پرسش هوا",
    "promptEn": "How is the weather in Rasht?",
    "instructionFa": "جمله را با استفاده از «What» و حفظ معنی بازنویسی کنید:",
    "answerEn": "What is the weather like in Rasht?",
    "altAnswers": [
      "What's the weather like in Rasht?"
    ],
    "options": [
      "What is the weather like in Rasht?",
      "What the weather is like in Rasht?",
      "How is the weather like in Rasht?",
      "What does the weather like in Rasht?"
    ],
    "explainFa": "معادل دقیق «How is the weather?» الگوی «What is the weather like?» است."
  },
  {
    "id": "tf_p3_1",
    "grade": "prospect_3",
    "lesson": 2,
    "typeFa": "منفی کردن حال استمراری",
    "promptEn": "The receptionist is answering the phone.",
    "instructionFa": "جمله را منفی کنید:",
    "answerEn": "The receptionist isn't answering the phone.",
    "altAnswers": [
      "The receptionist is not answering the phone."
    ],
    "options": [
      "The receptionist isn't answering the phone.",
      "The receptionist doesn't answering the phone.",
      "The receptionist not answering the phone.",
      "The receptionist doesn't answer the phone."
    ],
    "explainFa": "منفی حال استمراری با افزودن «not» به «am/is/are» ساخته می‌شود."
  },
  {
    "id": "tf_p3_2",
    "grade": "prospect_3",
    "lesson": 4,
    "typeFa": "افزودن قید تکرار",
    "promptEn": "Our teacher is polite and patient. (always)",
    "instructionFa": "قید «always» را در جایگاه استاندارد قرار دهید:",
    "answerEn": "Our teacher is always polite and patient.",
    "altAnswers": [],
    "options": [
      "Our teacher is always polite and patient.",
      "Our teacher always is polite and patient.",
      "Always our teacher is polite and patient.",
      "Our teacher is polite always and patient."
    ],
    "explainFa": "در جملهٔ عادی (بدون تأکید) قید تکرار «always» بعد از افعال to be می‌آید: «is always»."
  },
  {
    "id": "tf_p3_3",
    "grade": "prospect_3",
    "lesson": 3,
    "typeFa": "منفی کردن سوم‌شخص حال ساده",
    "promptEn": "Mina bakes a cake on Fridays.",
    "instructionFa": "جمله را منفی کنید:",
    "answerEn": "Mina doesn't bake a cake on Fridays.",
    "altAnswers": [
      "Mina does not bake a cake on Fridays."
    ],
    "options": [
      "Mina doesn't bake a cake on Fridays.",
      "Mina doesn't bakes a cake on Fridays.",
      "Mina don't bake a cake on Fridays.",
      "Mina isn't bake a cake on Fridays."
    ],
    "explainFa": "برای سوم‌شخص مفرد از «doesn't» استفاده شده و «s» از انتهای «bakes» حذف می‌شود."
  },
  {
    "id": "tf_p3_4",
    "grade": "prospect_3",
    "lesson": 4,
    "typeFa": "تبدیل به امری منفی",
    "promptEn": "Park your car in front of the hospital.",
    "instructionFa": "این دستور را به نهی (امری منفی) تبدیل کنید:",
    "answerEn": "Don't park your car in front of the hospital.",
    "altAnswers": [
      "Do not park your car in front of the hospital."
    ],
    "options": [
      "Don't park your car in front of the hospital.",
      "Doesn't park your car in front of the hospital.",
      "Not park your car in front of the hospital.",
      "No parking your car in front of the hospital."
    ],
    "explainFa": "جمله امری منفی همواره با «Don't + شکل ساده فعل» ساخته می‌شود."
  },
  {
    "id": "tf_p3_5",
    "grade": "prospect_3",
    "lesson": 5,
    "typeFa": "تبدیل حال به گذشته باقاعده",
    "promptEn": "They study English every night. (last night)",
    "instructionFa": "جمله را با «last night» به گذشته ساده تبدیل کنید:",
    "answerEn": "They studied English last night.",
    "altAnswers": [],
    "options": [
      "They studied English last night.",
      "They studyed English last night.",
      "They did studied English last night.",
      "They were study English last night."
    ],
    "explainFa": "فعل «study» در گذشته ساده به «studied» تبدیل می‌شود (تبدیل y بعد از همخوان به ied)."
  },
  {
    "id": "tf_p3_6",
    "grade": "prospect_3",
    "lesson": 6,
    "typeFa": "سؤالی کردن گذشته بی‌قاعده",
    "promptEn": "Saeed broke the glass yesterday.",
    "instructionFa": "جمله را با «Did» سؤالی کنید:",
    "answerEn": "Did Saeed break the glass yesterday?",
    "altAnswers": [],
    "options": [
      "Did Saeed break the glass yesterday?",
      "Did Saeed broke the glass yesterday?",
      "Was Saeed break the glass yesterday?",
      "Does Saeed broke the glass yesterday?"
    ],
    "explainFa": "با آمدن «Did» در ابتدای پرسش، شکل گذشته «broke» به ریشه ساده «break» برمی‌گردد!"
  },
  {
    "id": "tf_v1_1",
    "grade": "vision_1",
    "lesson": 1,
    "typeFa": "بیان قصد از پیش تعیین‌شده",
    "promptEn": "We plan to plant fifty trees next Friday. (be going to)",
    "instructionFa": "با ساختار «be going to» بازنویسی کنید:",
    "answerEn": "We are going to plant fifty trees next Friday.",
    "altAnswers": [
      "We're going to plant fifty trees next Friday."
    ],
    "options": [
      "We are going to plant fifty trees next Friday.",
      "We will going to plant fifty trees next Friday.",
      "We are going plant fifty trees next Friday.",
      "We is going to plant fifty trees next Friday."
    ],
    "explainFa": "برنامه و قصد قبلی با فاعل «We» به صورت «We are going to + فعل ساده» بیان می‌شود."
  },
  {
    "id": "tf_v1_2",
    "grade": "vision_1",
    "lesson": 2,
    "typeFa": "تبدیل به صفت تفضیلی",
    "promptEn": "Silver is not as expensive as gold.",
    "instructionFa": "با قرار دادن «Gold» در ابتدا و استفاده از «than» بازنویسی کنید:",
    "answerEn": "Gold is more expensive than silver.",
    "altAnswers": [],
    "options": [
      "Gold is more expensive than silver.",
      "Gold is expensiver than silver.",
      "Gold is the most expensive than silver.",
      "Gold is as expensive than silver."
    ],
    "explainFa": "وقتی نقره به گرانی طلا نیست، یعنی طلا از نقره گران‌تر است: «more expensive than»."
  },
  {
    "id": "tf_v1_3",
    "grade": "vision_1",
    "lesson": 2,
    "typeFa": "ترکیب صفات پیش از اسم (Writing)",
    "promptEn": "Ali bought a jacket. (leather / black / nice)",
    "instructionFa": "هر سه صفت را با رعایت ترتیب استاندارد قبل از jacket قرار دهید:",
    "answerEn": "Ali bought a nice black leather jacket.",
    "altAnswers": [],
    "options": [
      "Ali bought a nice black leather jacket.",
      "Ali bought a leather black nice jacket.",
      "Ali bought a black leather nice jacket.",
      "Ali bought a nice leather black jacket."
    ],
    "explainFa": "ترتیب صفات: نظر (nice) ← رنگ (black) ← جنس (leather) بلافاصله پیش از اسم."
  },
  {
    "id": "tf_v1_4",
    "grade": "vision_1",
    "lesson": 3,
    "typeFa": "ترکیب دو رویداد گذشته با when",
    "promptEn": "I was reading a book. The lights went out.",
    "instructionFa": "دو جمله را با «when» ترکیب کنید:",
    "answerEn": "I was reading a book when the lights went out.",
    "altAnswers": [],
    "options": [
      "I was reading a book when the lights went out.",
      "I read a book when the lights were going out.",
      "I was reading a book when the lights was going out.",
      "I am reading a book when the lights went out."
    ],
    "explainFa": "عمل طولانیِ در جریان با «was reading» و عمل قاطع کوتاه پس از «when» با گذشته ساده «went out» می‌آید."
  },
  {
    "id": "tf_v1_5",
    "grade": "vision_1",
    "lesson": 3,
    "typeFa": "افزودن ضمیر انعکاسی",
    "promptEn": "Nobody helped Maryam. She repaired the computer alone.",
    "instructionFa": "جمله دوم را با «by + ضمیر انعکاسی» بازنویسی کنید:",
    "answerEn": "She repaired the computer by herself.",
    "altAnswers": [],
    "options": [
      "She repaired the computer by herself.",
      "She repaired the computer by himself.",
      "She repaired the computer by her.",
      "She herself repaired by the computer."
    ],
    "explainFa": "معادل «alone» (به‌تنهایی) برای ضمیر مؤنث «She» عبارت «by herself» است."
  },
  {
    "id": "tf_v1_6",
    "grade": "vision_1",
    "lesson": 4,
    "typeFa": "تبدیل صفت به قید حالت (Writing)",
    "promptEn": "Mr. Rahimi is a careful driver.",
    "instructionFa": "جمله را با فعل «drives» و قید حالت بازنویسی کنید:",
    "answerEn": "Mr. Rahimi drives carefully.",
    "altAnswers": [],
    "options": [
      "Mr. Rahimi drives carefully.",
      "Mr. Rahimi drives careful.",
      "Mr. Rahimi careful drives.",
      "Mr. Rahimi is drives carefully."
    ],
    "explainFa": "صفت «careful» اسم «driver» را توصیف می‌کرد؛ برای توصیف فعل «drives» به قید «carefully» تبدیل می‌شود."
  },
  {
    "id": "tf_v2_1",
    "grade": "vision_2",
    "lesson": 1,
    "typeFa": "اصلاح اسم غیرقابل‌شمارش با واحد سنجش",
    "promptEn": "Please give me two advices.",
    "instructionFa": "خطای دستوری جمله را با «pieces of» اصلاح کنید:",
    "answerEn": "Please give me two pieces of advice.",
    "altAnswers": [],
    "options": [
      "Please give me two pieces of advice.",
      "Please give me two pieces of advices.",
      "Please give me two advice.",
      "Please give me a few advices."
    ],
    "explainFa": "واژه «advice» غیرقابل‌شمارش است؛ برای شمارش آن از «two pieces of advice» (بدون s روی advice!) استفاده می‌شود."
  },
  {
    "id": "tf_v2_2",
    "grade": "vision_2",
    "lesson": 2,
    "typeFa": "تبدیل گذشته به حال کامل با for",
    "promptEn": "Dr. Sami started working in this clinic ten years ago. (still works)",
    "instructionFa": "مفهوم را در قالب یک جمله حال کامل با «for» بنویسید:",
    "answerEn": "Dr. Sami has worked in this clinic for ten years.",
    "altAnswers": [],
    "options": [
      "Dr. Sami has worked in this clinic for ten years.",
      "Dr. Sami worked in this clinic for ten years ago.",
      "Dr. Sami has worked in this clinic since ten years.",
      "Dr. Sami have worked in this clinic for ten years."
    ],
    "explainFa": "کاری که ۱۰ سال پیش شروع شده و هنوز ادامه دارد با «has worked ... for ten years» بیان می‌شود."
  },
  {
    "id": "tf_v2_3",
    "grade": "vision_2",
    "lesson": 2,
    "typeFa": "ساخت فاعل با اسم مصدر (Gerund)",
    "promptEn": "It is harmful to smoke cigarettes.",
    "instructionFa": "جمله را با قرار دادن اسم مصدر (Smoking) در جایگاه فاعل بازنویسی کنید:",
    "answerEn": "Smoking cigarettes is harmful.",
    "altAnswers": [],
    "options": [
      "Smoking cigarettes is harmful.",
      "Smoking cigarettes are harmful.",
      "Smoke cigarettes is harmful.",
      "To smoking cigarettes is harmful."
    ],
    "explainFa": "وقتی «Smoking cigarettes» فاعل شود، فعل جمله مفرد «is» باقی می‌ماند (فریب جمع بودن cigarettes را نخورید!)."
  },
  {
    "id": "tf_v2_4",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "ترکیب شرطی نوع اول",
    "promptEn": "Study hard. You will pass the final exam.",
    "instructionFa": "دو جمله را با «If» در قالب شرطی نوع اول ترکیب کنید:",
    "answerEn": "If you study hard, you will pass the final exam.",
    "altAnswers": [],
    "options": [
      "If you study hard, you will pass the final exam.",
      "If you will study hard, you will pass the final exam.",
      "If you studied hard, you will pass the final exam.",
      "If study hard, you will pass the final exam."
    ],
    "explainFa": "در شرطی نوع اول، بخش «If» زمان حال ساده (If you study hard,) و بخش نتیجه «will pass» می‌گیرد."
  },
  {
    "id": "tf_v2_5",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "جایگزینی if...not با unless",
    "promptEn": "If she doesn't hurry up, she will miss the train.",
    "instructionFa": "جمله را با «Unless» بازنویسی کنید:",
    "answerEn": "Unless she hurries up, she will miss the train.",
    "altAnswers": [],
    "options": [
      "Unless she hurries up, she will miss the train.",
      "Unless she doesn't hurry up, she will miss the train.",
      "Unless she hurry up, she will miss the train.",
      "Unless she will hurry up, she will miss the train."
    ],
    "explainFa": "با جایگزینی «If ... doesn't» با «Unless»، فعل منفی حذف شده و فعلِ سوم‌شخص مفرد «s» می‌گیرد: «hurries up»!"
  },
  {
    "id": "tf_v2_6",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "ترکیب هدف با مصدر to (Writing)",
    "promptEn": "Sara went to the bookstore. She wanted to buy a dictionary.",
    "instructionFa": "دو جمله را با مصدر هدف (to) کوتاه و ترکیب کنید:",
    "answerEn": "Sara went to the bookstore to buy a dictionary.",
    "altAnswers": [],
    "options": [
      "Sara went to the bookstore to buy a dictionary.",
      "Sara went to the bookstore for buy a dictionary.",
      "Sara went to the bookstore for buying a dictionary.",
      "Sara went to the bookstore to buying a dictionary."
    ],
    "explainFa": "برای بیان هدف از انجام کار، «to + شکل ساده فعل» (to buy) جایگزین جمله دوم می‌شود."
  },
  {
    "id": "tf_v3_1",
    "grade": "vision_3",
    "lesson": 1,
    "typeFa": "تبدیل معلوم به مجهول گذشته ساده",
    "promptEn": "Alexander Fleming discovered penicillin in 1928.",
    "instructionFa": "جمله را به ساخت مجهول (Passive) تبدیل کنید:",
    "answerEn": "Penicillin was discovered by Alexander Fleming in 1928.",
    "altAnswers": [],
    "options": [
      "Penicillin was discovered by Alexander Fleming in 1928.",
      "Penicillin is discovered by Alexander Fleming in 1928.",
      "Penicillin has been discovered by Alexander Fleming in 1928.",
      "Penicillin were discovered by Alexander Fleming in 1928."
    ],
    "explainFa": "مفعول (Penicillin — مفرد) به اول می‌آید و چون «discovered» گذشته ساده است، «was discovered» می‌شود."
  },
  {
    "id": "tf_v3_2",
    "grade": "vision_3",
    "lesson": 1,
    "typeFa": "تبدیل معلوم به مجهول حال کامل",
    "promptEn": "Iranian scientists have produced new medicines recently.",
    "instructionFa": "جمله را به ساخت مجهول تبدیل کنید:",
    "answerEn": "New medicines have been produced by Iranian scientists recently.",
    "altAnswers": [],
    "options": [
      "New medicines have been produced by Iranian scientists recently.",
      "New medicines has been produced by Iranian scientists recently.",
      "New medicines were produced by Iranian scientists recently.",
      "New medicines have produced by Iranian scientists recently."
    ],
    "explainFa": "مفعول جمع «New medicines» + مجهول حال کامل «have been + P.P.» (have been produced)."
  },
  {
    "id": "tf_v3_3",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "تبدیل معلوم به مجهول با فعل وجهی",
    "promptEn": "Every driver must obey the traffic rules.",
    "instructionFa": "جمله را به صورت مجهول بازنویسی کنید:",
    "answerEn": "The traffic rules must be obeyed by every driver.",
    "altAnswers": [],
    "options": [
      "The traffic rules must be obeyed by every driver.",
      "The traffic rules must obeyed by every driver.",
      "The traffic rules are obeyed by every driver.",
      "The traffic rules must been obeyed by every driver."
    ],
    "explainFa": "فرمول مجهول مدال‌ها در امتحان نهایی: «Modal + be + P.P.» ➔ «must be obeyed»."
  },
  {
    "id": "tf_v3_4",
    "grade": "vision_3",
    "lesson": 1,
    "typeFa": "افزودن Tag Question با قید منفی",
    "promptEn": "Pious people rarely speak angrily, ...?",
    "instructionFa": "جمله کامل با پرسش ضمیمه‌ای (Tag) صحیح را انتخاب یا تایپ کنید:",
    "answerEn": "Pious people rarely speak angrily, do they?",
    "altAnswers": [
      "do they?",
      "do they"
    ],
    "options": [
      "Pious people rarely speak angrily, do they?",
      "Pious people rarely speak angrily, don't they?",
      "Pious people rarely speak angrily, are they?",
      "Pious people rarely speak angrily, did they?"
    ],
    "explainFa": "قید «rarely» (به‌ندرت) جمله را منفی کرده است؛ پس تگ مثبت در زمان حال ساده یعنی «do they?» صحیح است."
  },
  {
    "id": "tf_v3_5",
    "grade": "vision_3",
    "lesson": 1,
    "typeFa": "ترکیب دو جمله در قالب جمله مرکب (Compound)",
    "promptEn": "Reza had a bad headache. He finished his physics project on time.",
    "instructionFa": "دو جمله مستقل را با حرف ربط مناسب (and / but / or / so) ترکیب کنید:",
    "answerEn": "Reza had a bad headache, but he finished his physics project on time.",
    "altAnswers": [],
    "options": [
      "Reza had a bad headache, but he finished his physics project on time.",
      "Reza had a bad headache, so he finished his physics project on time.",
      "Reza had a bad headache, or he finished his physics project on time.",
      "Reza had a bad headache but, he finished his physics project on time."
    ],
    "explainFa": "میان «سردرد شدید» و «اتمام به‌موقع پروژه» رابطه تقابل برقرار است؛ پس ویرگول قبل از «, but» قرار می‌گیرد."
  },
  {
    "id": "tf_v3_6",
    "grade": "vision_3",
    "lesson": 2,
    "typeFa": "ترکیب دو جمله با ضمیر موصولی فاعلی who",
    "promptEn": "The woman is a dedicated physician. She cured the rural patients.",
    "instructionFa": "دو جمله را با ضمیر موصولی مناسب ترکیب کنید:",
    "answerEn": "The woman who cured the rural patients is a dedicated physician.",
    "altAnswers": [],
    "options": [
      "The woman who cured the rural patients is a dedicated physician.",
      "The woman whom cured the rural patients is a dedicated physician.",
      "The woman which cured the rural patients is a dedicated physician.",
      "The woman who she cured the rural patients is a dedicated physician."
    ],
    "explainFa": "«She» نقش فاعلی دارد؛ با حذف «She»، ضمیر «who» بلافاصله بعد از مرجع انسان «The woman» می‌نشیند!"
  },
  {
    "id": "tf_v3_7",
    "grade": "vision_3",
    "lesson": 2,
    "typeFa": "ترکیب دو جمله با ضمیر موصولی مفعولی whom",
    "promptEn": "The professor teaches at our university. You met him at the seminar.",
    "instructionFa": "دو جمله را با ضمیر موصولی رسمی مفعولی ترکیب کنید:",
    "answerEn": "The professor whom you met at the seminar teaches at our university.",
    "altAnswers": [],
    "options": [
      "The professor whom you met at the seminar teaches at our university.",
      "The professor whom you met him at the seminar teaches at our university.",
      "The professor which you met at the seminar teaches at our university.",
      "The professor who met at the seminar teaches at our university."
    ],
    "explainFa": "مفعولِ تکرارشونده «him» حتماً حذف می‌شود و «whom you met at the seminar» بعد از «The professor» قرار می‌گیرد!"
  },
  {
    "id": "tf_v3_8",
    "grade": "vision_3",
    "lesson": 2,
    "typeFa": "تبدیل واقعیت منفی به شرطی نوع دوم",
    "promptEn": "I don't have a monolingual dictionary, so I can't check the collocations.",
    "instructionFa": "این موقعیت واقعی را به جمله شرطی نوع دوم (خیالی) تبدیل کنید:",
    "answerEn": "If I had a monolingual dictionary, I could check the collocations.",
    "altAnswers": [],
    "options": [
      "If I had a monolingual dictionary, I could check the collocations.",
      "If I have a monolingual dictionary, I can check the collocations.",
      "If I didn't have a monolingual dictionary, I could check the collocations.",
      "If I had a monolingual dictionary, I couldn't check the collocations."
    ],
    "explainFa": "قانون طلایی امتحان نهایی: واقعیت منفی زمان حال (don't have / can't check) در شرطی نوع دوم به مثبت گذشته (had / could check) تبدیل می‌شود!"
  },
  {
    "id": "tf_v3_9",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "ترکیب دو رویداد گذشته با Before (ماضی بعید)",
    "promptEn": "First, Mina learned all the grammar rules. Then, she took the national exam.",
    "instructionFa": "دو رویداد را با «before» ترکیب کنید:",
    "answerEn": "Mina had learned all the grammar rules before she took the national exam.",
    "altAnswers": [],
    "options": [
      "Mina had learned all the grammar rules before she took the national exam.",
      "Mina had learn all the grammar rules before she took the national exam.",
      "Mina has learned all the grammar rules before she took the national exam.",
      "Mina had learned all the grammar rules before she takes the national exam."
    ],
    "explainFa": "رخداد اول (یادگیری قواعد) به گذشته کامل «had learned» و رخداد دوم پس از «before» به گذشته ساده «took» می‌رود."
  },
  {
    "id": "tf_v3_10",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "ترکیب علت و معلول گذشته با because",
    "promptEn": "The streets were completely wet yesterday morning. It rained all night.",
    "instructionFa": "دو جمله را با «because» و رعایت تقدم زمانی ترکیب کنید:",
    "answerEn": "The streets were completely wet yesterday morning because it had rained all night.",
    "altAnswers": [],
    "options": [
      "The streets were completely wet yesterday morning because it had rained all night.",
      "The streets were completely wet yesterday morning because it has rained all night.",
      "The streets were completely wet yesterday morning because it had rain all night.",
      "The streets were completely wet yesterday morning because it rains all night."
    ],
    "explainFa": "باریدن باران در طول شب «علتِ مقدم» بر خیس بودن خیابان در صبح دیروز است؛ پس «because it had rained» صحیح است."
  },
  {
    "id": "tf_p1_5",
    "grade": "prospect_1",
    "lesson": 1,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "I am a student.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Are you a student?",
    "altAnswers": [],
    "options": [
      "Are you a student?",
      "Do you a student?",
      "Is you a student?",
      "You are a student?"
    ],
    "explainFa": "برای فعل «be» از «am/is/are» استفاده می‌کنیم و ضمیر «I» به «you» تبدیل می‌شود."
  },
  {
    "id": "tf_p1_6",
    "grade": "prospect_1",
    "lesson": 1,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "Your name is Sara.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What is your name?",
    "altAnswers": [],
    "options": [
      "What is your name?",
      "What your name is?",
      "How is your name?",
      "Who is your name?"
    ],
    "explainFa": "پرسیدن نام با الگوی «What is your ...?» انجام می‌شود."
  },
  {
    "id": "tf_p1_7",
    "grade": "prospect_1",
    "lesson": 2,
    "typeFa": "تبدیل this به that",
    "promptEn": "This girl is my sister.",
    "instructionFa": "با اشارهٔ دورتر بازنویسی کنید:",
    "answerEn": "That girl is my sister.",
    "altAnswers": [],
    "options": [
      "That girl is my sister.",
      "Those girl is my sister.",
      "That girls is my sister.",
      "That girl are my sister."
    ],
    "explainFa": "«that» مفرد است و برای فرد دورتر به‌کار می‌رود."
  },
  {
    "id": "tf_p1_8",
    "grade": "prospect_1",
    "lesson": 2,
    "typeFa": "جایگزینی ضمیر با اسم",
    "promptEn": "She is my best friend. Her bag is red.",
    "instructionFa": "ضمیر «She» را با نام جایگزین کنید:",
    "answerEn": "Zahra is my best friend. Zahra's bag is red.",
    "altAnswers": [],
    "options": [
      "Zahra is my best friend. Zahra's bag is red.",
      "Zahra is my best friend. Her bag is red.",
      "She is my best friend. Zahra's bag is red.",
      "Zahra are my best friend. Zahra bag is red."
    ],
    "explainFa": "با تبدیل «She» به «Zahra»، صفت ملکی هم به «Zahra's» تبدیل می‌شود."
  },
  {
    "id": "tf_p1_9",
    "grade": "prospect_1",
    "lesson": 2,
    "typeFa": "ترکیب دو جمله با and",
    "promptEn": "He is my brother. She is my sister.",
    "instructionFa": "دو جمله را با «and» ترکیب کنید:",
    "answerEn": "He is my brother and she is my sister.",
    "altAnswers": [],
    "options": [
      "He is my brother and she is my sister.",
      "He is my brother she is my sister.",
      "He is my brother and he is my sister.",
      "He my brother and she is my sister."
    ],
    "explainFa": "پس از «and» جملهٔ دوم با ضمیر «she» آغاز می‌شود و «is» می‌گیرد."
  },
  {
    "id": "tf_p1_10",
    "grade": "prospect_1",
    "lesson": 3,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "I am twelve years old.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "How old are you?",
    "altAnswers": [],
    "options": [
      "How old are you?",
      "How old is you?",
      "How old you are?",
      "How many years are you?"
    ],
    "explainFa": "برای پرسیدن سن از الگوی «How old + verb» استفاده می‌کنیم."
  },
  {
    "id": "tf_p1_11",
    "grade": "prospect_1",
    "lesson": 3,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "She is ten years old.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "How old is she?",
    "altAnswers": [],
    "options": [
      "How old is she?",
      "How old are she?",
      "How old she is?",
      "How many years is she?"
    ],
    "explainFa": "فاعل «she» مفرد است، پس «is» می‌گیرد."
  },
  {
    "id": "tf_p1_12",
    "grade": "prospect_1",
    "lesson": 3,
    "typeFa": "تغییر ماه تولد",
    "promptEn": "My birthday is in Tir.",
    "instructionFa": "ماه تولد را به «Mordad» تغییر دهید:",
    "answerEn": "My birthday is in Mordad.",
    "altAnswers": [],
    "options": [
      "My birthday is in Mordad.",
      "My birthday is at Mordad.",
      "My birthday is on Mordad.",
      "My birthday is Mordad."
    ],
    "explainFa": "قبل از نام ماه‌های سال همیشه «in» می‌آید."
  },
  {
    "id": "tf_p1_13",
    "grade": "prospect_1",
    "lesson": 4,
    "typeFa": "تصحیح a و an",
    "promptEn": "She is a engineer.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "She is an engineer.",
    "altAnswers": [],
    "options": [
      "She is an engineer.",
      "She is a engineer.",
      "She is an enginer.",
      "She are an engineer."
    ],
    "explainFa": "«engineer» با صدای مصوت آغاز می‌شود، پس «an» می‌گیرد."
  },
  {
    "id": "tf_p1_14",
    "grade": "prospect_1",
    "lesson": 4,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "My father is a mechanic.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What is your father?",
    "altAnswers": [],
    "options": [
      "What is your father?",
      "What your father is?",
      "Who your father is?",
      "What does your father?"
    ],
    "explainFa": "برای پرسیدن شغل با «What is ...?» از «is» استفاده می‌کنیم."
  },
  {
    "id": "tf_p1_15",
    "grade": "prospect_1",
    "lesson": 4,
    "typeFa": "تبدیل جمله به ضمیر ملکی",
    "promptEn": "This is Reza. Reza's bag is new.",
    "instructionFa": "جملهٔ دوم را با صفت ملکی بازنویسی کنید:",
    "answerEn": "This is Reza. His bag is new.",
    "altAnswers": [],
    "options": [
      "This is Reza. His bag is new.",
      "This is Reza. Her bag is new.",
      "This is Reza. He bag is new.",
      "This is Reza. His bag are new."
    ],
    "explainFa": "چون «Reza» مذکر است، صفت ملکی «his» به‌کار می‌رود."
  },
  {
    "id": "tf_p1_16",
    "grade": "prospect_1",
    "lesson": 5,
    "typeFa": "ترکیب دو صفت با and",
    "promptEn": "She is tall. She has black hair.",
    "instructionFa": "دو جمله را با «and» ترکیب کنید:",
    "answerEn": "She is tall and she has black hair.",
    "altAnswers": [],
    "options": [
      "She is tall and she has black hair.",
      "She is tall and she have black hair.",
      "She is tall and she is black hair.",
      "She tall and she has black hair."
    ],
    "explainFa": "با «and» دو جمله را وصل می‌کنیم؛ با «she» فعل «has» می‌آید (نه «have») و برای مو «has» لازم است نه «is»."
  },
  {
    "id": "tf_p1_17",
    "grade": "prospect_1",
    "lesson": 5,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "He has blue eyes.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What color are his eyes?",
    "altAnswers": [],
    "options": [
      "What color are his eyes?",
      "What color is his eyes?",
      "What color his eyes are?",
      "How color are his eyes?"
    ],
    "explainFa": "«eyes» جمع است، پس فعل «are» و ضمیر ملکی «his» به‌کار می‌رود."
  },
  {
    "id": "tf_p1_18",
    "grade": "prospect_1",
    "lesson": 5,
    "typeFa": "ترتیب صفات",
    "promptEn": "My sister has hair. (brown / long)",
    "instructionFa": "صفات را به ترتیب درست قبل از اسم بنویسید:",
    "answerEn": "My sister has long brown hair.",
    "altAnswers": [],
    "options": [
      "My sister has long brown hair.",
      "My sister has brown long hair.",
      "My sister is long brown hair.",
      "My sister has long brown hairs."
    ],
    "explainFa": "قبل از اسم، صفت اندازه (long) پیش از صفت رنگ (brown) می‌آید؛ «hair» غیرقابل‌شمارش است و «s» نمی‌گیرد."
  },
  {
    "id": "tf_p1_19",
    "grade": "prospect_1",
    "lesson": 6,
    "typeFa": "تبدیل به حال استمراری",
    "promptEn": "He reads a book. (now)",
    "instructionFa": "جمله را به زمان حال استمراری تبدیل کنید:",
    "answerEn": "He is reading a book now.",
    "altAnswers": [],
    "options": [
      "He is reading a book now.",
      "He read a book now.",
      "He reading a book now.",
      "He is read a book now."
    ],
    "explainFa": "برای کار در حال انجام از «is/am/are + verb-ing» استفاده می‌کنیم."
  },
  {
    "id": "tf_p1_20",
    "grade": "prospect_1",
    "lesson": 6,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "They are playing football in the yard.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What are they doing in the yard?",
    "altAnswers": [],
    "options": [
      "What are they doing in the yard?",
      "What is they doing in the yard?",
      "What they are doing in the yard?",
      "What do they doing in the yard?"
    ],
    "explainFa": "فاعل «they» جمع است، پس «are» می‌گیرد."
  },
  {
    "id": "tf_p1_21",
    "grade": "prospect_1",
    "lesson": 6,
    "typeFa": "ترکیب دو کار با and",
    "promptEn": "She cooks dinner. She talks on the phone.",
    "instructionFa": "دو جمله را با «and» و فعل ing ترکیب کنید:",
    "answerEn": "She is cooking dinner and talking on the phone.",
    "altAnswers": [],
    "options": [
      "She is cooking dinner and talking on the phone.",
      "She is cooking dinner and talks on the phone.",
      "She cooks dinner and talking on the phone.",
      "She is cook dinner and talking on the phone."
    ],
    "explainFa": "هر دو فعل به شکل ing می‌آیند: «is cooking … and talking»؛ «talks» زمان را عوض می‌کند و «is cook» غلط است."
  },
  {
    "id": "tf_p1_22",
    "grade": "prospect_1",
    "lesson": 7,
    "typeFa": "تبدیل on به at با پلاک",
    "promptEn": "Our school is on Azadi Street.",
    "instructionFa": "با افزودن شمارهٔ پلاک بازنویسی کنید:",
    "answerEn": "Our school is at 12 Azadi Street.",
    "altAnswers": [],
    "options": [
      "Our school is at 12 Azadi Street.",
      "Our school is in 12 Azadi Street.",
      "Our school is at on Azadi Street.",
      "Our school is 12 on Azadi Street."
    ],
    "explainFa": "وقتی آدرس شمارهٔ پلاک دارد از «at» استفاده می‌کنیم."
  },
  {
    "id": "tf_p1_23",
    "grade": "prospect_1",
    "lesson": 7,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "The class starts at eight.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What time does the class start?",
    "altAnswers": [],
    "options": [
      "What time does the class start?",
      "What time do the class start?",
      "What time the class starts?",
      "At what time is the class start?"
    ],
    "explainFa": "برای پرسیدن ساعت از «What time» و برای فعل سوم‌شخص مفرد از «does» استفاده می‌کنیم."
  },
  {
    "id": "tf_p1_24",
    "grade": "prospect_1",
    "lesson": 7,
    "typeFa": "تصحیح حرف اضافه ساعت",
    "promptEn": "I get up in 6 o'clock.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "I get up at 6 o'clock.",
    "altAnswers": [],
    "options": [
      "I get up at 6 o'clock.",
      "I get up in 6 o'clock.",
      "I get up on 6 o'clock.",
      "I get up at 6 clock."
    ],
    "explainFa": "قبل از ساعت دقیق همیشه «at» می‌آید."
  },
  {
    "id": "tf_p1_25",
    "grade": "prospect_1",
    "lesson": 8,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "I like kebab.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Do you like kebab?",
    "altAnswers": [],
    "options": [
      "Do you like kebab?",
      "Are you like kebab?",
      "Do you likes kebab?",
      "Like you kebab?"
    ],
    "explainFa": "فعل «like» را هرگز با «are» سؤالی نمی‌کنیم؛ «do» می‌آید."
  },
  {
    "id": "tf_p1_26",
    "grade": "prospect_1",
    "lesson": 8,
    "typeFa": "تبدیل به تعارف مؤدبانه",
    "promptEn": "Do you like tea?",
    "instructionFa": "به تعارف مؤدبانه بازنویسی کنید:",
    "answerEn": "Would you like some tea?",
    "altAnswers": [],
    "options": [
      "Would you like some tea?",
      "Would you like a tea?",
      "Would you likes some tea?",
      "Do you would like some tea?"
    ],
    "explainFa": "قاعدهٔ این درس: در تعارف با نوشیدنیِ غیرقابل‌شمارش «Would you like some …?» می‌آید؛ «a tea» (= یک فنجان چای) محاوره‌ای است و جواب کتاب نیست."
  },
  {
    "id": "tf_p1_27",
    "grade": "prospect_1",
    "lesson": 8,
    "typeFa": "ترکیب دو جمله با and",
    "promptEn": "I am hungry. I am thirsty.",
    "instructionFa": "دو جمله را با «and» ترکیب کنید:",
    "answerEn": "I am hungry and thirsty.",
    "altAnswers": [],
    "options": [
      "I am hungry and thirsty.",
      "I hungry and thirsty.",
      "I am hungry and I thirsty.",
      "I am hungry and is thirsty."
    ],
    "explainFa": "«am» برای هر دو صفت مشترک است: «I am hungry and thirsty»؛ در «I thirsty» و «is thirsty» فعل درست نیامده."
  },
  {
    "id": "tf_p2_5",
    "grade": "prospect_2",
    "lesson": 1,
    "typeFa": "تبدیل کشور به صفت ملیت",
    "promptEn": "She is from Spain.",
    "instructionFa": "جمله را با صفت ملیت بازنویسی کنید:",
    "answerEn": "She is Spanish.",
    "altAnswers": [],
    "options": [
      "She is Spanish.",
      "She is from Spanish.",
      "She are Spanish.",
      "She is Spain."
    ],
    "explainFa": "بدون «from» از صفت ملیت استفاده می‌کنیم."
  },
  {
    "id": "tf_p2_6",
    "grade": "prospect_2",
    "lesson": 1,
    "typeFa": "تبدیل کشور به صفت ملیت",
    "promptEn": "He is from Germany.",
    "instructionFa": "جمله را با صفت ملیت بازنویسی کنید:",
    "answerEn": "He is German.",
    "altAnswers": [],
    "options": [
      "He is German.",
      "He is Germany.",
      "He are German.",
      "He is from German."
    ],
    "explainFa": "صفت ملیت آلمانی «German» است و «from» حذف می‌شود."
  },
  {
    "id": "tf_p2_7",
    "grade": "prospect_2",
    "lesson": 2,
    "typeFa": "تصحیح حرف اضافه روزهای هفته",
    "promptEn": "I play volleyball in Fridays.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "I play volleyball on Fridays.",
    "altAnswers": [],
    "options": [
      "I play volleyball on Fridays.",
      "I play volleyball in Fridays.",
      "I play volleyball at Fridays.",
      "I plays volleyball on Fridays."
    ],
    "explainFa": "قبل از روزهای هفته «on» می‌آید."
  },
  {
    "id": "tf_p2_8",
    "grade": "prospect_2",
    "lesson": 2,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "They have English class on Monday.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "When do they have English class?",
    "altAnswers": [],
    "options": [
      "When do they have English class?",
      "When do they has English class?",
      "When they do have English class?",
      "When does they have English class?"
    ],
    "explainFa": "برای پرسیدن زمان از «When» و «do» استفاده می‌کنیم."
  },
  {
    "id": "tf_p2_9",
    "grade": "prospect_2",
    "lesson": 2,
    "typeFa": "ترکیب دو جمله با and",
    "promptEn": "We visit our relatives on Fridays. We have dinner together.",
    "instructionFa": "دو جمله را با «and» ترکیب کنید:",
    "answerEn": "We visit our relatives on Fridays and we have dinner together.",
    "altAnswers": [],
    "options": [
      "We visit our relatives on Fridays and we have dinner together.",
      "We visit our relatives on Fridays and we has dinner together.",
      "We visit our relatives on Fridays and we dinner together.",
      "We visit our relatives on Fridays and we having dinner together."
    ],
    "explainFa": "دو جمله با «and» وصل می‌شوند؛ با «we» فعل «have» می‌آید و جملهٔ دوم بدون فعل ناقص است."
  },
  {
    "id": "tf_p2_10",
    "grade": "prospect_2",
    "lesson": 3,
    "typeFa": "تبدیل به منفی",
    "promptEn": "She can play the piano.",
    "instructionFa": "جمله را منفی کنید:",
    "answerEn": "She can't play the piano.",
    "altAnswers": [],
    "options": [
      "She can't play the piano.",
      "She doesn't can play the piano.",
      "She cannot to play the piano.",
      "She can not plays the piano."
    ],
    "explainFa": "«can» خودش با «not» منفی می‌شود و فعل اصلی ساده می‌ماند."
  },
  {
    "id": "tf_p2_11",
    "grade": "prospect_2",
    "lesson": 3,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "He can drive a car.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Can he drive a car?",
    "altAnswers": [],
    "options": [
      "Can he drive a car?",
      "Does he can drive a car?",
      "Can he drives a car?",
      "Is he can drive a car?"
    ],
    "explainFa": "پرسش توانایی با «Can» در ابتدای جمله می‌آید."
  },
  {
    "id": "tf_p2_12",
    "grade": "prospect_2",
    "lesson": 4,
    "typeFa": "تصحیح should",
    "promptEn": "You should to rest.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "You should rest.",
    "altAnswers": [],
    "options": [
      "You should rest.",
      "You should to rest.",
      "You should rests.",
      "You should resting."
    ],
    "explainFa": "بعد از «should» فعل بدون «to» می‌آید."
  },
  {
    "id": "tf_p2_13",
    "grade": "prospect_2",
    "lesson": 4,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "I have a headache.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What's wrong with you?",
    "altAnswers": [],
    "options": [
      "What's wrong with you?",
      "What wrong with you?",
      "What's wrong you?",
      "How is wrong with you?"
    ],
    "explainFa": "برای پرسیدن دربارهٔ مشکل از «What's wrong with ...?» استفاده می‌کنیم."
  },
  {
    "id": "tf_p2_14",
    "grade": "prospect_2",
    "lesson": 4,
    "typeFa": "ساخت توصیه پزشکی",
    "promptEn": "Mina has a fever.",
    "instructionFa": "یک توصیهٔ مناسب بسازید:",
    "answerEn": "Mina shouldn't go to school today.",
    "altAnswers": [],
    "options": [
      "Mina shouldn't go to school today.",
      "Mina shouldn't goes to school today.",
      "Mina should to not go to school today.",
      "Mina shouldn't to go to school today."
    ],
    "explainFa": "در توصیهٔ منفی از «shouldn't» با فعل ساده استفاده می‌کنیم."
  },
  {
    "id": "tf_p2_15",
    "grade": "prospect_2",
    "lesson": 5,
    "typeFa": "تبدیل مفرد به جمع",
    "promptEn": "There is a bus stop near my house.",
    "instructionFa": "جمله را به جمع تبدیل کنید:",
    "answerEn": "There are two bus stops near my house.",
    "altAnswers": [],
    "options": [
      "There are two bus stops near my house.",
      "There is two bus stops near my house.",
      "There are a bus stop near my house.",
      "There are two bus stop near my house."
    ],
    "explainFa": "«two bus stops» جمع است، پس «There are» می‌آید."
  },
  {
    "id": "tf_p2_16",
    "grade": "prospect_2",
    "lesson": 5,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "There is a big park in our town.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Is there a big park in our town?",
    "altAnswers": [],
    "options": [
      "Is there a big park in our town?",
      "Are there a big park in our town?",
      "Is there big park in our town?",
      "Do there is a big park in our town?"
    ],
    "explainFa": "پرسش وجود با «Is there» ساخته می‌شود."
  },
  {
    "id": "tf_p2_17",
    "grade": "prospect_2",
    "lesson": 6,
    "typeFa": "تصحیح پرسش آب‌وهوا",
    "promptEn": "How is the weather like?",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "What is the weather like?",
    "altAnswers": [],
    "options": [
      "What is the weather like?",
      "How is the weather like?",
      "What the weather is like?",
      "How the weather is like?"
    ],
    "explainFa": "وقتی «like» در پایان جمله باشد، «What» به‌کار می‌رود."
  },
  {
    "id": "tf_p2_18",
    "grade": "prospect_2",
    "lesson": 6,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "It is cold and rainy today.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What is the weather like today?",
    "altAnswers": [],
    "options": [
      "What is the weather like today?",
      "How is the weather like today?",
      "What does the weather like today?",
      "What is like the weather today?"
    ],
    "explainFa": "با «like» در پایان، پرسش با «What» ساخته می‌شود."
  },
  {
    "id": "tf_p2_19",
    "grade": "prospect_2",
    "lesson": 7,
    "typeFa": "تبدیل like به interested in",
    "promptEn": "I like playing chess.",
    "instructionFa": "جمله را با «interested in» بازنویسی کنید:",
    "answerEn": "I am interested in playing chess.",
    "altAnswers": [],
    "options": [
      "I am interested in playing chess.",
      "I am interested in play chess.",
      "I interested in playing chess.",
      "I am interested on playing chess."
    ],
    "explainFa": "بعد از «in» فعل به شکل «-ing» می‌آید."
  },
  {
    "id": "tf_p2_20",
    "grade": "prospect_2",
    "lesson": 7,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "She enjoys reading books.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What does she enjoy doing?",
    "altAnswers": [],
    "options": [
      "What does she enjoy doing?",
      "What does she enjoys doing?",
      "What she does enjoy doing?",
      "What do she enjoy doing?"
    ],
    "explainFa": "پس از «enjoy» فعل به شکل «-ing» و سؤال با «does» ساخته می‌شود."
  },
  {
    "id": "tf_p2_21",
    "grade": "prospect_2",
    "lesson": 7,
    "typeFa": "تصحیح good at",
    "promptEn": "Zahra is good in cooking.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "Zahra is good at cooking.",
    "altAnswers": [],
    "options": [
      "Zahra is good at cooking.",
      "Zahra is good in cooking.",
      "Zahra is good to cooking.",
      "Zahra is good at cook."
    ],
    "explainFa": "برای بیان مهارت «good at» به‌کار می‌رود."
  },
  {
    "id": "tf_p3_7",
    "grade": "prospect_3",
    "lesson": 1,
    "typeFa": "تبدیل به پرسش شخصیت",
    "promptEn": "He is patient and kind.",
    "instructionFa": "جمله را به پرسش تبدیل کنید:",
    "answerEn": "What is he like?",
    "altAnswers": [],
    "options": [
      "What is he like?",
      "What is he look like?",
      "How is he like?",
      "What he is like?"
    ],
    "explainFa": "«What is ... like?» دربارهٔ ویژگی شخصیتی است."
  },
  {
    "id": "tf_p3_8",
    "grade": "prospect_3",
    "lesson": 1,
    "typeFa": "ترکیب دو جمله با and",
    "promptEn": "He is patient. He is kind.",
    "instructionFa": "دو جمله را با «and» ترکیب کنید:",
    "answerEn": "He is patient and kind.",
    "altAnswers": [],
    "options": [
      "He is patient and kind.",
      "He is patient and he kind.",
      "He is patient and kind is.",
      "He is and patient kind."
    ],
    "explainFa": "فاعل و فعل مشترک (He is) یک بار می‌آیند و دو صفت با «and» وصل می‌شوند؛ در «he kind» فعل نیامده."
  },
  {
    "id": "tf_p3_9",
    "grade": "prospect_3",
    "lesson": 3,
    "typeFa": "تبدیل اسم به ضمیر ملکی",
    "promptEn": "Sara's room is clean.",
    "instructionFa": "جمله را با ضمیر ملکی بازنویسی کنید:",
    "answerEn": "Her room is clean.",
    "altAnswers": [],
    "options": [
      "Her room is clean.",
      "She room is clean.",
      "Hers room is clean.",
      "Her rooms is clean."
    ],
    "explainFa": "برای مالکیت مفرد مؤنث از «her» استفاده می‌کنیم."
  },
  {
    "id": "tf_p3_10",
    "grade": "prospect_3",
    "lesson": 2,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "They are waiting in the lobby.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "What are they doing in the lobby?",
    "altAnswers": [],
    "options": [
      "What are they doing in the lobby?",
      "What is they doing in the lobby?",
      "What they are doing in the lobby?",
      "What do they doing in the lobby?"
    ],
    "explainFa": "پرسش با «What are + subject + verb-ing» ساخته می‌شود."
  },
  {
    "id": "tf_p3_11",
    "grade": "prospect_3",
    "lesson": 2,
    "typeFa": "تصحیح املای ing",
    "promptEn": "She is makeing a cake.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "She is making a cake.",
    "altAnswers": [],
    "options": [
      "She is making a cake.",
      "She is makeing a cake.",
      "She is make a cake.",
      "She is mak ing a cake."
    ],
    "explainFa": "حرف «e» بی‌صدا پیش از «-ing» حذف می‌شود."
  },
  {
    "id": "tf_p3_12",
    "grade": "prospect_3",
    "lesson": 3,
    "typeFa": "تبدیل به سؤال",
    "promptEn": "Iranians celebrate Yalda Night every year.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Do Iranians celebrate Yalda Night every year?",
    "altAnswers": [],
    "options": [
      "Do Iranians celebrate Yalda Night every year?",
      "Do Iranians celebrates Yalda Night every year?",
      "Do Iranians celebrating Yalda Night every year?",
      "Does Iranians celebrate Yalda Night every year?"
    ],
    "explainFa": "با «Do» فعل به شکل ساده می‌آید."
  },
  {
    "id": "tf_p3_13",
    "grade": "prospect_3",
    "lesson": 4,
    "typeFa": "تبدیل به امری منفی",
    "promptEn": "Cross the street when the traffic light is green.",
    "instructionFa": "جمله را به امری منفی تبدیل کنید:",
    "answerEn": "Don't cross the street when the traffic light is green.",
    "altAnswers": [],
    "options": [
      "Don't cross the street when the traffic light is green.",
      "Doesn't cross the street when the traffic light is green.",
      "Don't crossing the street when the traffic light is green.",
      "Not cross the street when the traffic light is green."
    ],
    "explainFa": "جملهٔ امری منفی با «Don't» و فعل ساده ساخته می‌شود."
  },
  {
    "id": "tf_p3_14",
    "grade": "prospect_3",
    "lesson": 4,
    "typeFa": "تبدیل به پرسش Wh",
    "promptEn": "The bank opens at eight in the morning.",
    "instructionFa": "جمله را به پرسش تبدیل کنید:",
    "answerEn": "When does the bank open?",
    "altAnswers": [],
    "options": [
      "When does the bank open?",
      "When do the bank open?",
      "When the bank opens?",
      "What time the bank opens?"
    ],
    "explainFa": "پرسش Wh با «does» و فعل ساده ساخته می‌شود."
  },
  {
    "id": "tf_p3_15",
    "grade": "prospect_3",
    "lesson": 5,
    "typeFa": "تبدیل حال به گذشته",
    "promptEn": "We clean the classroom every Friday. (last Friday)",
    "instructionFa": "جمله را به گذشتهٔ ساده تبدیل کنید:",
    "answerEn": "We cleaned the classroom last Friday.",
    "altAnswers": [],
    "options": [
      "We cleaned the classroom last Friday.",
      "We cleaned the classroom every Friday.",
      "We clean the classroom last Friday.",
      "We clean the classroom every Friday."
    ],
    "explainFa": "در گذشته فعل باقاعده «-ed» می‌گیرد و زمان عادت به زمان گذشته تغییر می‌کند."
  },
  {
    "id": "tf_p3_16",
    "grade": "prospect_3",
    "lesson": 5,
    "typeFa": "تبدیل به سؤال گذشته",
    "promptEn": "She passed the exam on Monday.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "Did she pass the exam on Monday?",
    "altAnswers": [],
    "options": [
      "Did she pass the exam on Monday?",
      "Did she passed the exam on Monday?",
      "Do she passed the exam on Monday?",
      "Did she passes the exam on Monday?"
    ],
    "explainFa": "بعد از «Did» فعل به شکل ساده می‌آید."
  },
  {
    "id": "tf_p3_17",
    "grade": "prospect_3",
    "lesson": 6,
    "typeFa": "تبدیل به منفی گذشته",
    "promptEn": "He went to the hospital last night.",
    "instructionFa": "جمله را منفی کنید:",
    "answerEn": "He didn't go to the hospital last night.",
    "altAnswers": [],
    "options": [
      "He didn't go to the hospital last night.",
      "He didn't went to the hospital last night.",
      "He not went to the hospital last night.",
      "He wasn't go to the hospital last night."
    ],
    "explainFa": "در منفی گذشته، فعل بی‌قاعده هم به شکل ساده برمی‌گردد."
  },
  {
    "id": "tf_p3_18",
    "grade": "prospect_3",
    "lesson": 6,
    "typeFa": "تبدیل به سؤال گذشته",
    "promptEn": "She cut her finger while cooking.",
    "instructionFa": "جمله را به سؤال تبدیل کنید:",
    "answerEn": "How did she cut her finger?",
    "altAnswers": [],
    "options": [
      "How did she cut her finger?",
      "How did she cuted her finger?",
      "How she did cut her finger?",
      "How does she cut her finger?"
    ],
    "explainFa": "پس از «did» شکل ساده فعل می‌آید."
  },
  {
    "id": "tf_p3_19",
    "grade": "prospect_3",
    "lesson": 2,
    "typeFa": "مالکیت با ’s",
    "promptEn": "Ali has a new bike.",
    "instructionFa": "جمله را با ’s بازنویسی کنید (This is …):",
    "answerEn": "This is Ali's new bike.",
    "altAnswers": [],
    "options": [
      "This is Ali's new bike.",
      "This is Alis new bike.",
      "This is new Ali's bike.",
      "This is Ali new bike's."
    ],
    "explainFa": "مالکیتِ انسان با «’s» ساخته می‌شود و صفت بعد از آن می‌آید: «Ali's new bike» (کتاب ص ۳۶: «Kate's scarf»)."
  },
  {
    "id": "tf_p3_20",
    "grade": "prospect_3",
    "lesson": 5,
    "typeFa": "حال به گذشتهٔ to be",
    "promptEn": "They are at the museum today.",
    "instructionFa": "جمله را با yesterday به گذشته ببرید:",
    "answerEn": "They were at the museum yesterday.",
    "altAnswers": [],
    "options": [
      "They were at the museum yesterday.",
      "They was at the museum yesterday.",
      "They are at the museum yesterday.",
      "They did be at the museum yesterday."
    ],
    "explainFa": "با «yesterday» فعل to be گذشته می‌شود و برای «They» شکل «were» می‌آید (کتاب ص ۸۸: «They were happy last winter»)."
  },
  {
    "id": "tf_p3_21",
    "grade": "prospect_3",
    "lesson": 6,
    "typeFa": "جایگزینی با ضمیر مفعولی",
    "promptEn": "Sara called her grandmother last night.",
    "instructionFa": "مفعول (her grandmother) را با ضمیر مفعولی جایگزین کنید:",
    "answerEn": "Sara called her last night.",
    "altAnswers": [],
    "options": [
      "Sara called her last night.",
      "Sara called she last night.",
      "Sara called hers last night.",
      "Sara called herself last night."
    ],
    "explainFa": "مفعولِ مؤنثِ مفرد ← «her» (کتاب ص ۱۰۲: «Mina looked at Zahra / her»)."
  },
  {
    "id": "tf_v1_7",
    "grade": "vision_1",
    "lesson": 1,
    "typeFa": "تبدیل به be going to",
    "promptEn": "We will visit Shiraz next week.",
    "instructionFa": "جمله را با «be going to» بازنویسی کنید:",
    "answerEn": "We are going to visit Shiraz next week.",
    "altAnswers": [],
    "options": [
      "We are going to visit Shiraz next week.",
      "We are going visit Shiraz next week.",
      "We going to visit Shiraz next week.",
      "We are go to visit Shiraz next week."
    ],
    "explainFa": "«are going to» با ضمیر «we» و فعل ساده به‌کار می‌رود."
  },
  {
    "id": "tf_v1_8",
    "grade": "vision_1",
    "lesson": 1,
    "typeFa": "بیان قول و تصمیم آنی",
    "promptEn": "I will carry those heavy boxes for you.",
    "instructionFa": "با «Wait!» تصمیم آنی را بسازید:",
    "answerEn": "Wait! I will carry those heavy boxes for you.",
    "altAnswers": [],
    "options": [
      "Wait! I will carry those heavy boxes for you.",
      "Wait! I will to carry those heavy boxes for you.",
      "Wait! I carrying those heavy boxes for you.",
      "Wait! I am carry those heavy boxes for you."
    ],
    "explainFa": "«will» برای تصمیم آنی و قول به‌کار می‌رود."
  },
  {
    "id": "tf_v1_9",
    "grade": "vision_1",
    "lesson": 1,
    "typeFa": "Writing: جمع‌های بی‌قاعده",
    "promptEn": "Two wolf and three child.",
    "instructionFa": "جمع‌های بی‌قاعده را درست کنید:",
    "answerEn": "Two wolves and three children.",
    "altAnswers": [],
    "options": [
      "Two wolves and three children.",
      "Two wolfs and three childs.",
      "Two wolves and three childrens.",
      "Two wolf and three children."
    ],
    "explainFa": "جمع «wolf» می‌شود «wolves» و جمع «child» می‌شود «children»."
  },
  {
    "id": "tf_v1_10",
    "grade": "vision_1",
    "lesson": 2,
    "typeFa": "تبدیل به صفت عالی",
    "promptEn": "Damavand is higher than Tochal.",
    "instructionFa": "جمله را با صفت عالی بازنویسی کنید:",
    "answerEn": "Damavand is the highest mountain in Iran.",
    "altAnswers": [],
    "options": [
      "Damavand is the highest mountain in Iran.",
      "Damavand is the higher mountain in Iran.",
      "Damavand is more higher mountain in Iran.",
      "Damavand is highest mountain in Iran."
    ],
    "explainFa": "برای صفت کوتاه از «the -est» و «the» استفاده می‌کنیم."
  },
  {
    "id": "tf_v1_11",
    "grade": "vision_1",
    "lesson": 2,
    "typeFa": "ترتیب صفات پیش از اسم (Writing)",
    "promptEn": "He bought a car. (red / old / beautiful)",
    "instructionFa": "صفات را با ترتیب درست بنویسید:",
    "answerEn": "He bought a beautiful old red car.",
    "altAnswers": [],
    "options": [
      "He bought a beautiful old red car.",
      "He bought a red old beautiful car.",
      "He bought a beautiful red old car.",
      "He bought an old beautiful red car."
    ],
    "explainFa": "ترتیب صفات: نظر (beautiful) → سن (old) → رنگ (red)."
  },
  {
    "id": "tf_v1_12",
    "grade": "vision_1",
    "lesson": 3,
    "typeFa": "ترکیب دو رویداد با when",
    "promptEn": "She was cooking dinner. The doorbell rang.",
    "instructionFa": "دو جمله را با «when» ترکیب کنید:",
    "answerEn": "She was cooking dinner when the doorbell rang.",
    "altAnswers": [],
    "options": [
      "She was cooking dinner when the doorbell rang.",
      "She was cooking dinner while the doorbell rang.",
      "She cooked dinner when the doorbell was ringing.",
      "She was cook dinner when the doorbell rang."
    ],
    "explainFa": "در این الگو، کار در جریان با گذشتهٔ استمراری و رویداد کوتاهِ قطع‌کننده با گذشتهٔ ساده می‌آید."
  },
  {
    "id": "tf_v1_13",
    "grade": "vision_1",
    "lesson": 3,
    "typeFa": "افزودن ضمیر انعکاسی",
    "promptEn": "Maryam cut her finger.",
    "instructionFa": "با ضمیر انعکاسی بازنویسی کنید:",
    "answerEn": "Maryam cut herself.",
    "altAnswers": [],
    "options": [
      "Maryam cut herself.",
      "Maryam cut himself.",
      "Maryam cut themselves.",
      "Maryam cut my finger."
    ],
    "explainFa": "وقتی فاعل و مفعول یکی هستند از ضمیر انعکاسی استفاده می‌کنیم."
  },
  {
    "id": "tf_v1_14",
    "grade": "vision_1",
    "lesson": 4,
    "typeFa": "تبدیل به must",
    "promptEn": "It is necessary to wear a helmet.",
    "instructionFa": "با «must» بازنویسی کنید:",
    "answerEn": "You must wear a helmet.",
    "altAnswers": [],
    "options": [
      "You must wear a helmet.",
      "You must to wear a helmet.",
      "You must wearing a helmet.",
      "You must wears a helmet."
    ],
    "explainFa": "بعد از «must» فعل به شکل ساده و بدون «to» می‌آید."
  },
  {
    "id": "tf_v1_15",
    "grade": "vision_1",
    "lesson": 4,
    "typeFa": "بیان احتمال با might",
    "promptEn": "Perhaps it will rain tonight.",
    "instructionFa": "با «might» بازنویسی کنید:",
    "answerEn": "It might rain tonight.",
    "altAnswers": [],
    "options": [
      "It might rain tonight.",
      "It might to rain tonight.",
      "It might rains tonight.",
      "It might raining tonight."
    ],
    "explainFa": "«might» احتمال را نشان می‌دهد و فعل ساده می‌گیرد."
  },
  {
    "id": "tf_v1_16",
    "grade": "vision_1",
    "lesson": 4,
    "typeFa": "تبدیل صفت به قید حالت (Writing)",
    "promptEn": "He is a slow speaker.",
    "instructionFa": "صفت را به قید حالت تبدیل کنید:",
    "answerEn": "He speaks slowly.",
    "altAnswers": [],
    "options": [
      "He speaks slowly.",
      "He speaks slow.",
      "He speaks speakly.",
      "He is speaks slowly."
    ],
    "explainFa": "قید حالت از صفت با افزودن «-ly» ساخته می‌شود."
  },
  {
    "id": "tf_v2_7",
    "grade": "vision_2",
    "lesson": 1,
    "typeFa": "اصلاح کمیت‌نما با اسم غیرقابل‌شمارش",
    "promptEn": "How many money do you have?",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "How much money do you have?",
    "altAnswers": [],
    "options": [
      "How much money do you have?",
      "How many money do you have?",
      "How much moneys do you have?",
      "How many much money do you have?"
    ],
    "explainFa": "«money» غیرقابل‌شمارش است و با «How much» می‌آید."
  },
  {
    "id": "tf_v2_8",
    "grade": "vision_2",
    "lesson": 1,
    "typeFa": "افزودن واحد سنجش",
    "promptEn": "I need two advices.",
    "instructionFa": "با واحد سنجش بازنویسی کنید:",
    "answerEn": "I need two pieces of advice.",
    "altAnswers": [],
    "options": [
      "I need two pieces of advice.",
      "I need two piece of advices.",
      "I need two advices.",
      "I need two advices piece."
    ],
    "explainFa": "«advice» غیرقابل‌شمارش است و با «pieces of advice» می‌آید."
  },
  {
    "id": "tf_v2_9",
    "grade": "vision_2",
    "lesson": 1,
    "typeFa": "اصلاح توافق فعل",
    "promptEn": "There is many students in the class.",
    "instructionFa": "جمله را اصلاح کنید:",
    "answerEn": "There are many students in the class.",
    "altAnswers": [],
    "options": [
      "There are many students in the class.",
      "There is many students in the class.",
      "There are many student in the class.",
      "There is a many students in the class."
    ],
    "explainFa": "«students» جمع است، پس «There are» می‌آید."
  },
  {
    "id": "tf_v2_10",
    "grade": "vision_2",
    "lesson": 2,
    "typeFa": "تبدیل گذشته به حال کامل",
    "promptEn": "I started studying English three years ago.",
    "instructionFa": "به زمان حال کامل تبدیل کنید:",
    "answerEn": "I have studied English for three years.",
    "altAnswers": [],
    "options": [
      "I have studied English for three years.",
      "I have studied English since three years.",
      "I am studying English for three years.",
      "I studied English for three years."
    ],
    "explainFa": "برای طول مدت از «for» استفاده می‌کنیم."
  },
  {
    "id": "tf_v2_11",
    "grade": "vision_2",
    "lesson": 2,
    "typeFa": "ساخت جمله با اسم مصدر",
    "promptEn": "It is a good habit to read.",
    "instructionFa": "با اسم مصدر بازنویسی کنید:",
    "answerEn": "Reading is a good habit.",
    "altAnswers": [],
    "options": [
      "Reading is a good habit.",
      "Read is a good habit.",
      "To read is a good habit.",
      "Reading are a good habit."
    ],
    "explainFa": "وقتی فاعل اسم مصدر است، فعل جمله مفرد «is» می‌آید."
  },
  {
    "id": "tf_v2_12",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "بازنویسی شرطی با جابه‌جایی شرط",
    "promptEn": "If we protect the environment, the city will be cleaner.",
    "instructionFa": "بخش شرط را به انتهای جمله ببرید:",
    "answerEn": "The city will be cleaner if we protect the environment.",
    "altAnswers": [],
    "options": [
      "The city will be cleaner if we protect the environment.",
      "The city is cleaner if we protect the environment.",
      "The city will be clean if we protected the environment.",
      "The city cleaner will be if we protect the environment."
    ],
    "explainFa": "با جابه‌جایی بخش شرط، جمله همچنان شرطی نوع اول است."
  },
  {
    "id": "tf_v2_13",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "تبدیل if به unless",
    "promptEn": "If he doesn't revise, he will fail.",
    "instructionFa": "با «unless» بازنویسی کنید:",
    "answerEn": "He will fail unless he revises.",
    "altAnswers": [],
    "options": [
      "He will fail unless he revises.",
      "He will fail unless he doesn't revise.",
      "He will fail unless he will revise.",
      "He unless will fail he revises."
    ],
    "explainFa": "«unless» به‌معنای «if ... not» است و فعل مثبت می‌گیرد."
  },
  {
    "id": "tf_v2_14",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "ترکیب هدف با مصدر to",
    "promptEn": "He joined a course. He wanted to improve his speaking.",
    "instructionFa": "دو جمله را با مصدر هدف ترکیب کنید:",
    "answerEn": "He joined a course to improve his speaking.",
    "altAnswers": [],
    "options": [
      "He joined a course to improve his speaking.",
      "He joined a course for improve his speaking.",
      "He joined a course to improving his speaking.",
      "He joined a course that improve his speaking."
    ],
    "explainFa": "مصدر هدف با «to + V» بیان می‌شود."
  },
  {
    "id": "tf_v2_15",
    "grade": "vision_2",
    "lesson": 1,
    "typeFa": "عدد با حروف",
    "promptEn": "The museum has 3,000 old coins.",
    "instructionFa": "عدد را با حروف بنویسید:",
    "answerEn": "The museum has three thousand old coins.",
    "altAnswers": [],
    "options": [
      "The museum has three thousand old coins.",
      "The museum has three thousands old coins.",
      "The museum has three thousands of old coins.",
      "The museum has old three thousand coins."
    ],
    "explainFa": "عدد + «thousand» (بدون s و بدون of) + صفت + اسم جمع ← «three thousand old coins» (کتاب ص ۳۳)."
  },
  {
    "id": "tf_v2_16",
    "grade": "vision_2",
    "lesson": 2,
    "typeFa": "فعل دوکلمه‌ای هم‌معنی",
    "promptEn": "My grandfather stopped smoking last year.",
    "instructionFa": "به‌جای stopped فعل دوکلمه‌ای هم‌معنی بگذارید:",
    "answerEn": "My grandfather gave up smoking last year.",
    "altAnswers": [],
    "options": [
      "My grandfather gave up smoking last year.",
      "My grandfather gave off smoking last year.",
      "My grandfather gave up to smoke last year.",
      "My grandfather given up smoking last year."
    ],
    "explainFa": "«stop + V-ing» = «give up + V-ing» (ترک کردن)؛ گذشتهٔ «give» ← «gave» (کتاب ص ۶۸)."
  },
  {
    "id": "tf_v2_17",
    "grade": "vision_2",
    "lesson": 3,
    "typeFa": "صفت -ed برای احساس",
    "promptEn": "The news surprised everyone.",
    "instructionFa": "جمله را با صفت -ed بازنویسی کنید (Everyone was …):",
    "answerEn": "Everyone was surprised at the news.",
    "altAnswers": [
      "Everyone was surprised by the news."
    ],
    "options": [
      "Everyone was surprised at the news.",
      "Everyone was surprising at the news.",
      "Everyone surprised at the news.",
      "Everyone was surprise at the news."
    ],
    "explainFa": "حسِ افراد ← «surprised»؛ چیزی که این حس را می‌دهد ← «surprising» (کتاب ص ۹۸: «They were greatly surprised at the news»)."
  },
  {
    "id": "tf_v3_11",
    "grade": "vision_3",
    "lesson": 2,
    "typeFa": "ترکیب دو جمله با ضمیر موصولی",
    "promptEn": "The scientist works in our lab. She won a national prize.",
    "instructionFa": "دو جمله را با «who» ترکیب کنید:",
    "answerEn": "The scientist who works in our lab won a national prize.",
    "altAnswers": [],
    "options": [
      "The scientist who works in our lab won a national prize.",
      "The scientist which works in our lab won a national prize.",
      "The scientist who work in our lab won a national prize.",
      "The scientist whom works in our lab won a national prize."
    ],
    "explainFa": "مرجع انسان و دارای فعل، پس «who» به‌کار می‌رود."
  },
  {
    "id": "tf_v3_12",
    "grade": "vision_3",
    "lesson": 2,
    "typeFa": "تبدیل واقعیت به شرطی نوع دوم",
    "promptEn": "I am not a doctor, so I cannot help you.",
    "instructionFa": "با شرطی نوع دوم بازنویسی کنید:",
    "answerEn": "If I were a doctor, I could help you.",
    "altAnswers": [],
    "options": [
      "If I were a doctor, I could help you.",
      "If I am a doctor, I could help you.",
      "If I was a doctor, I can help you.",
      "If I were doctor, I could help you."
    ],
    "explainFa": "در شرطی نوع دوم برای همهٔ ضمایر «were» و در نتیجه «could» می‌آید."
  },
  {
    "id": "tf_v3_13",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "ترکیب دو رویداد با After و ماضی بعید",
    "promptEn": "The engineers finished the tests. They connected the panels.",
    "instructionFa": "دو جمله را با «After» و گذشتهٔ کامل ترکیب کنید:",
    "answerEn": "After the engineers had finished the tests, they connected the panels.",
    "altAnswers": [],
    "options": [
      "After the engineers had finished the tests, they connected the panels.",
      "After the engineers finished the tests, they had connected the panels.",
      "After the engineers had finish the tests, they connected the panels.",
      "After the engineers have finished the tests, they connected the panels."
    ],
    "explainFa": "کار قدیمی‌تر «had finished» و کار جدیدتر گذشتهٔ ساده است."
  },
  {
    "id": "tf_v3_14",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "ترکیب با By the time",
    "promptEn": "The train left the station. We reached the station late.",
    "instructionFa": "دو جمله را با «By the time» ترکیب کنید:",
    "answerEn": "By the time we reached the station, the train had left.",
    "altAnswers": [],
    "options": [
      "By the time we reached the station, the train had left.",
      "By the time we had reached the station, the train left.",
      "By the time we reached the station, the train has left.",
      "By the time reached the station, the train had left."
    ],
    "explainFa": "«By the time» با گذشتهٔ ساده و «had + P.P.» می‌آید."
  },
  {
    "id": "tf_v3_15",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "ترکیب علت و معلول در گذشته",
    "promptEn": "He was tired. He had worked for ten hours.",
    "instructionFa": "دو جمله را با «because» ترکیب کنید:",
    "answerEn": "He was tired because he had worked for ten hours.",
    "altAnswers": [],
    "options": [
      "He was tired because he had worked for ten hours.",
      "He was tired because he has worked for ten hours.",
      "He was tired because had he worked for ten hours.",
      "He was tired because he had work for ten hours."
    ],
    "explainFa": "علتِ مقدم در گذشته با «had + P.P.» بیان می‌شود."
  },
  {
    "id": "tf_v3_16",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "معلوم به مجهول با فعل وجهی",
    "promptEn": "The workers should collect the garbage every morning.",
    "instructionFa": "جمله را مجهول کنید (فعل وجهی حفظ شود):",
    "answerEn": "The garbage should be collected every morning.",
    "altAnswers": [
      "The garbage should be collected by the workers every morning.",
      "The garbage should be collected every morning by the workers."
    ],
    "options": [
      "The garbage should be collected every morning.",
      "The garbage should collected every morning.",
      "The garbage should be collect every morning.",
      "The garbage should be collecting every morning."
    ],
    "explainFa": "مجهول با فعل وجهی: «should + be + P.P»؛ مفعول (the garbage) فاعل می‌شود، فعل وجهی همان می‌ماند و آوردن «by the workers» اختیاری است (کتاب ص ۸۶)."
  },
  {
    "id": "tf_v3_17",
    "grade": "vision_3",
    "lesson": 3,
    "typeFa": "معلوم به مجهول با can",
    "promptEn": "We can use solar energy for heating water.",
    "instructionFa": "جمله را مجهول کنید (بدون ذکر انجام‌دهنده):",
    "answerEn": "Solar energy can be used for heating water.",
    "altAnswers": [],
    "options": [
      "Solar energy can be used for heating water.",
      "Solar energy can used for heating water.",
      "Solar energy can be use for heating water.",
      "Solar energy can is used for heating water."
    ],
    "explainFa": "«can + be + P.P» ← «can be used»؛ انجام‌دهندهٔ عمومی (we) در مجهول معمولاً ذکر نمی‌شود (کتاب ص ۸۷، تمرین F)."
  }
];
