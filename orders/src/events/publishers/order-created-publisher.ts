import { Publisher, OrderCreatedEvent, Subjects } from '@jpox-org/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
