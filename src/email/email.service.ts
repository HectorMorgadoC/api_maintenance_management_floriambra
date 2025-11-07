/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(subject: string, html: string) {
    try {
      const emailClient: string = process.env.EMAIL_CLIENT || "";
      const to: string = process.env.EMAIL_SUPERVISOR || "";
      const data = await this.resend.emails.send({
        from: emailClient, // Debe ser un dominio verificado
        to: [to],
        subject: subject,
        html: html,
      });
      return data;
    } catch (error) {
      throw new Error(`Error enviando email: ${error.message}`);
    }
  }

  async orderRegisterEmail(
    orderNumber: string,
    team: string,
    descriptionFault: string,
  ) {
    const html = `
            <h2 style=color:indigo>Order successfully registered: ${orderNumber}</h2>
            <h3 style=color:darkslategray>Team: ${team}</h3>
            <p style=color:darkslategray>Fault description: ${descriptionFault}</p>
  `;
    return this.sendEmail("Order successfully registered", html);
  }

  async ReportRegisterEmail(
    orderNumber: string,
    reportNumber: string,
    team: string,
    technical: string,
  ) {
    const html = `
            <h2 style=color:darkslateblue>Report successfully registered: ${reportNumber}</h2>
            <h3 style=color:darkslategray>Number order: ${orderNumber}</h3>
            <h3 style=color:darkslategray>Team: ${team}</h3>
            <h3 style=color:darkslategray>Technical: ${technical}</h3>
  `;
    return this.sendEmail("Report successfully registered", html);
  }
}
