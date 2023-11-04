import { AggregateRoot, Description, Email, ID, Name } from 'lib/common/src';

export type restaurantProps = {
  name: Name;
  email: Email;
  description: Description;
};

type restaurantPrimitives = {
  id: string;
  name: string;
  email: string;
  description: string;
};

export class Restaurant extends AggregateRoot<restaurantProps> {
  constructor(props: restaurantProps, id?: ID) {
    super(props, id);
  }

  static create(props: restaurantProps, id?: ID): Restaurant {
    const restaurant = new Restaurant(props, id);

    return restaurant;
  }

  static fromPrimitives(primitives: restaurantPrimitives) {
    return new Restaurant(
      {
        name: new Name(primitives.name),
        email: new Email(primitives.email),
        description: new Description(primitives.description),
      },
      new ID(primitives.id),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.props.name.value,
      email: this.props.email.value,
      description: this.props.description.value,
    };
  }

  updateEmail(email: Email) {
    this.props.email = email;
  }
}
