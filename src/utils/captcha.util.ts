export const getCaptchaToken = () => {
  grecaptcha.ready(async () => {
    const siteKey = process.env.CAPTCHA_SECRET_KEY;

    const token = await grecaptcha.execute(siteKey!, {
      action: "registeration",
    });
    return token;
  });
};

export const verifyToken = async (token: string) => {
  try {
    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    if (!secretKey) {
      throw new Error("secret key is not found");
    }

    const url = new URL("https://www.google.com/recaptcha/api/siteverify");
    url.searchParams.append("secret",secretKey);
    url.searchParams.append("response",token);

    const res = await fetch(url,{method:"POST"});
    const captchaData:captchaDataType = await res.json();
    return captchaData;
  } catch (error: any) {
    throw new Error(error.message || "something went wrong")
  }
};

interface captchaDataType{
    "success": true|false,
    "challenge_ts": string,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    "error-codes":string[]      // optional
    "score":number;
  }
