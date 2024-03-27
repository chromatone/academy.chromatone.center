import Stripe from 'stripe'


export default defineEventHandler(async event => {

  const config = useRuntimeConfig(event)

  const stripe = new Stripe(config.stripeSecretKey)
  const body = await readBody(event)
  const session_id = body.session_id

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: config.public.appDomain
  })

  await sendRedirect(event, portalSession.url)

})