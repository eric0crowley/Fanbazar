# FanBazaar — دموی وب سه برنامه

سایت استاتیک (بدون بیلد، بدون سرور) شامل صفحهٔ اصلی و سه دموی کامل:

| مسیر | برنامه |
| --- | --- |
| `/` | صفحهٔ اصلی با لینک سه دمو (`index.html`) |
| `/lex/` | فرهنگ‌لکس (واژگان، فلش‌کارت، بازی، صوت ضبط‌شده) |
| `/gram/` | فرهنگ‌گرامر (گرامر، تمرین، مرور) |
| `/darsyar/` | درس‌یار (جعبه‌ابزار معلم) |

پوشه‌های صوتی در ریشهٔ سایت:

| پوشه | محتوا | تعداد |
| --- | --- | --- |
| `sentences/us/`, `sentences/uk/` | صوت جمله‌ها (آمریکایی / بریتانیایی) | ۳۹۳۴ |
| `tokens/us/`, `tokens/uk/` | صوت واژه‌ها (آمریکایی / بریتانیایی) | ۵۰۷۶ |
| `further/`, `further/uk/` | متن‌های Further Reading/Listening | ۵۸ |

مجموع: **۱۵٬۸۲۷ فایل، حدود ۲۰۳ مگابایت**.

## تغییر انجام‌شده نسبت به نسخهٔ اصلی

`lex/js/app.js` قبلاً صوت را از دو پروژهٔ جداگانهٔ Cloudflare می‌گرفت
(`fanbazaar-audio.pages.dev` و `fanbazaar-further.pages.dev`). حالا هر دو به
فایل‌های محلیِ همین سایت اشاره می‌کنند:

- `audioFactory` → `audio/sentences/…`، `audio/tokens/…` و `audio/further/…`
  با `new URL('../' + …, location.href)` به ریشهٔ سایت (`/sentences/…`، `/tokens/…`، `/further/…`) نگاشت می‌شوند.
- پخش‌کنندهٔ متن‌های Further → `new URL('../' + info.file, location.href)`.
- هیچ ارجاعی به `pages.dev` در کد باقی نمانده است.

## تنظیمات Cloudflare Pages (Git integration)

| فیلد | مقدار |
| --- | --- |
| Framework preset | **None** |
| Build command | خالی بگذارید (یا `exit 0`) |
| Build output directory | `/` |
| Production branch | برنچی که دیپلوی می‌شود (جزئیات در پیام راهنما) |

فایل `_headers` در ریشه، هدرهای امنیتی و کش صوتی/فونت را تنظیم می‌کند.
`google_drive/` (فایل‌های ZIP اصلی، حدود ۱۹۰ مگابایت) در `.gitignore` است و
در ریپو/دیپلوی نیست.

## محدودیت‌های Cloudflare Pages که رعایت شده‌اند

- حداکثر حجم هر فایل: ۲۵ MiB — بزرگ‌ترین فایل این سایت ۳٫۲ MiB است ✅
- حداکثر تعداد فایل در هر دیپلوی: ۲۰٬۰۰۰ — این سایت ۱۵٬۸۲۷ فایل دارد ✅

## راهنمای دیپلوی روی Cloudflare Pages (اتصال GitHub)

1. **Workers & Pages → Create → Pages → Connect to Git**
2. اجازهٔ دسترسی به ریپوی `eric0crowley/Fanbazar` را بدهید (Only select repositories).
3. **Production branch**: `arena/ed019103-fanbazar`
   (اگر بعداً به `main` مرج شد، همین فیلد را در Settings عوض کنید.)
4. **Framework preset**: `None`
5. **Build command**: `exit 0` — **Build output directory**: `/`
6. **Save and Deploy**. در لاگ باید `Found 15830 files` و بعد
   `Success: Your site was deployed!` دیده شود.
7. آدرس نهایی: `https://<project-name>.pages.dev`

بعد از دیپلوی این چهار آدرس باید ۲۰۰ بدهند: `/`، `/lex/`، `/gram/`، `/darsyar/`
و نمونهٔ صوت: `/sentences/us/000.mp3`، `/tokens/uk/000.mp3`،
`/further/uk/vision_1_l1_reading.mp3`.

## نکته‌های شناخته‌شده (از فایل‌های اصلی، تغییری داده نشد)

- در `lex/data/recorded_audio_candidates.js` دو آیتم `vision_3_l3_listening1` و
  `vision_3_l3_listening2` فایل صوتی هم را جابه‌جا گرفته‌اند؛ یعنی «Listening 2»
  صوت «Listening 1» را پخش می‌کند. هر دو فایل روی سرور موجودند و اصلاحش یک
  تغییر دادهٔ کوچک است (به‌خواست شما انجام می‌شود).

## تست محلی

```bash
python3 -m http.server 8000
# http://localhost:8000/        صفحهٔ اصلی
# http://localhost:8000/lex/    فرهنگ‌لکس
```

> این نسخه‌ها نمایشی‌اند و داده‌ها فقط در مرورگر همان دستگاه ذخیره می‌شوند.
