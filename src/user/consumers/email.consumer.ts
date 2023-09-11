import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { env } from 'src/config';
import { WELCOME_EMAIL } from 'src/core/constants';

@Processor('send-email')
export class EmailConsumer {
  @Process(WELCOME_EMAIL)
  async registerEmail(job: Job<any>) {
    const time1 = new Date();
    // const data = job.data
    // console.log(data)
    // const time2 = new Date()
    // console.log(`Welcome user:${data['name']} email: ${data['to']} to ${env.APP_NAME}`)

    // TEST time response
    setTimeout(() => {
      const data = job.data;
      console.log(data);
      const time2 = new Date();
      console.log(
        `Welcome user:${data['name']} email: ${data['to']} to ${env.APP_NAME}`,
      );
      console.log('Time: ', time2.getTime() - time1.getTime(), 'ms');
    }, 3000);
  }
}
