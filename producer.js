import amqp from "amqplib";

async function sendMail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "mail_exchange";
    const routingKeyForMail = "send_mail";
    const routingKeyForUser = "send_user_details";

    const message = {
      to: "abc@gmail.com",
      from: "daughter@gmail.com",
      subject: "Hello",
      body: "Thank you",
    };

    await channel.assertExchange(exchange, "direct", { durable: false });

    await channel.assertQueue("mail_queue", { durable: false });
    await channel.assertQueue("user_queue", { durable: false });

    await channel.bindQueue("mail_queue", exchange, routingKeyForMail);
    await channel.bindQueue("user_queue", exchange, routingKeyForUser);

    channel.publish(
      exchange,
      routingKeyForUser,
      Buffer.from(JSON.stringify(message))
    );

    console.log("mail data was sent", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log("error", error);
  }
}

sendMail();
