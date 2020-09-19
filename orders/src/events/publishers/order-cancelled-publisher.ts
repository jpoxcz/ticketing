import { Subjects, Publisher, OrderCancelledEvent } from '@jpox-org/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
