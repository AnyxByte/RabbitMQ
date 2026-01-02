# RabbitMQ – Basics

RabbitMQ is a **message broker**.  
It helps different parts of an application communicate **asynchronously** using messages.

---

## What is RabbitMQ?

RabbitMQ allows:
- One service to **send messages** (Producer)
- Another service to **receive messages** (Consumer)
- Messages are stored temporarily in **Queues**

This helps build **scalable, decoupled systems**.

---

## Core Concepts

- **Producer**: Sends messages
- **Queue**: Stores messages
- **Consumer**: Receives messages
- **Exchange**: Routes messages to queues
- **Broker**: RabbitMQ server itself

---

## Running RabbitMQ with Docker

```bash
docker run -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
