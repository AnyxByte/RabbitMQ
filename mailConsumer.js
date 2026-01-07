import amqp from "amqplib";

async function recieveMail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("mail_queue", { durable: false });

    channel.consume("mail_queue", (msg) => {
      if (msg !== null) {
        console.log("Recieve msg from mail_queue: ", JSON.parse(msg.content));
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
}

recieveMail();
