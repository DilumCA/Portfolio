import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_cvkmetj';
const TEMPLATE_ID = 'template_kgc3lrb';
const PUBLIC_KEY  = 'rI3tVakFjB_gIVeHb';

export async function sendContactEmail(formRef) {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef, { publicKey: PUBLIC_KEY });
}
