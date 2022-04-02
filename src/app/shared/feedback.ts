export class Feedback {
  id: string = '0';
  firstName: string = 'firstname';
  lastName: string = 'lastName';
  telnum: number = 0;
  email: string = 'email';
  agree: boolean = false;
  contacttype: string = 'None';
  messages: string = 'bla blabla bla bla blabla bla ';
}

export const ContactType = ['None', 'Tel', 'Email'];
