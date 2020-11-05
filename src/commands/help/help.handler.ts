import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';
import { ServerService } from '../../server/server.service';

@Injectable()
export class HelpHandler implements ICommandHandler {
  constructor(private readonly serverService: ServerService) {}

  name = 'help';
  test(content: string): boolean {
    return /^help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const prefix = this.serverService.formatPrefix(
      await this.serverService.getServerPrefix(message.guild?.id),
    );

    message.channel.send({
      embed: {
        description: 'Coach help',
        fields: [
          {
            name: `${prefix}track weight <weight in kg>`,
            value:
              'Track your weight and return a report. :wink: you can send a DM.',
          },
          {
            name: `${prefix}help`,
            value: 'display this message',
          },
          {
            name: `${prefix}invite`,
            value: 'Send an invite link for this awesome bot!',
          },
          {
            name: `${prefix}status`,
            value: 'display bot informations',
          },
        ],
      },
    });
  }
}
