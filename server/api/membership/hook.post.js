import Stripe from 'stripe'

// API version 2023-10-16

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig(event)

  let endpointSecret = config.stripeWebhookSecret

  const stripe = new Stripe(config.stripeSecretKey)

  const stripeEvent = await readRawBody(event)

  const sig = getHeader(event, 'stripe-signature')
  let msg

  try {
    msg = stripe.webhooks.constructEvent(stripeEvent, sig, endpointSecret);
  }
  catch (err) {
    console.log('signature not verified', err)
    return 'Event signature not verified'
  }

  console.log(msg.type)

  if (msg.type == 'customer.created') {
    console.log('creating a new customer')
    await addStudent(msg)
  }

  if (msg.type.startsWith('customer.subscription')) {
    if (msg.type.endsWith('created')) {
      console.log('subscription created')
    }
  }

  return msg.type + ' is ok'
})