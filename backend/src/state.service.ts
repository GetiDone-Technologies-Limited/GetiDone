import { Injectable } from '@nestjs/common';

@Injectable()
export class StateService {
  users: any[] = [];
  jobs: any[] = [];
  applications: any[] = [];
  conversations: any[] = [];
  messages: any[] = [];
  escrows: any[] = [];

  clear() {
    this.users = [];
    this.jobs = [];
    this.applications = [];
    this.conversations = [];
    this.messages = [];
    this.escrows = [];
  }
}
