import { Subjects, Publisher, PaymentCreatedEvent } from '@jpox-org/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
