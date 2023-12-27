const newsletterForm = document.querySelector(".newsletter-form");

const submitEmail = async (email) => {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "fddea972-17b9-42e7-b347-cc7eda7fedbc",
        email,
        subject: "New email subscription"
      }),
    });
    const data = await response.json();
    if (response.status === 200 && data.success) {
      return { success: true, error: null };
    }
    throw new Error(
      typeof data?.message === "string" ? data.message : "Something went wrong."
    );
  } catch (err) {
    return {
      success: false,
      error:
        typeof err?.message === "string"
          ? err.message
          : "Something went wrong.",
    };
  }
};

newsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInputElement = document.querySelector(".email-input");
  const email = emailInputElement.value?.trim();
  if (typeof email === "string") {
    const isEmailValid = email.match(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    const formFeedbackTextElement = document.querySelector(
      ".submission-response-text"
    );
    if (!isEmailValid) {
      formFeedbackTextElement.style.display = "block";
      formFeedbackTextElement.style.color = "red";
      formFeedbackTextElement.innerText = "Please enter a valid email address.";
      return;
    }
    const submitButton = document.querySelector(".newsletter-form-submit-btn");
    submitButton?.setAttribute("disabled", "true");
    const submitted = await submitEmail(email);
    submitButton?.removeAttribute("disabled");
    if (submitted.success) {
      emailInputElement.value = "";
      formFeedbackTextElement.style.display = "block";
      formFeedbackTextElement.style.color = "green";
      formFeedbackTextElement.innerText = "Your email has been saved with us.";
      setTimeout(() => {
        formFeedbackTextElement.style.display = "none";
        formFeedbackTextElement.innerText = "";
      }, 3000);
    } else {
      formFeedbackTextElement.style.display = "block";
      formFeedbackTextElement.style.color = "red";
      formFeedbackTextElement.innerText = typeof submitted.error === "string" ? submitted.error : "Something went wrong.";
    }
  }
});
