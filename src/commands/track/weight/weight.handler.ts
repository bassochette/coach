import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { WeightService } from '../../../body-metrics/weight/weight.service';
import { WeightVariation } from '../../../body-metrics/weight/weight.interfaces';

interface WeightHandlerParameters {
  rawWeight: string;
}

@Injectable()
export class WeightHandler implements ICommandHandler {
  name = 'track weight <weight in kg>';
  description = '';
  regex = /^(?:track )?(?:weight|poid) ([0-9]+[.|,]?[0-9]*)/i;

  constructor(private readonly weightService: WeightService) {}

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const { rawWeight } = this.extractParameters(message.content);

    const weight = this.transformRawWeight(rawWeight);
    const variation = await this.weightService.logWeight(
      message.author.id,
      weight,
    );

    const embed = this.formatMessage(variation);
    message.channel.send(embed);
  }

  extractParameters(content: string): WeightHandlerParameters {
    const [cmd, rawWeight] = content.match(this.regex);
    return {
      rawWeight,
    };
  }

  transformRawWeight(rawWeight: string): number {
    return parseFloat(rawWeight.replace(',', '.'));
  }

  formatMessage(weightVariation: WeightVariation): MessageEmbed {
    const embed = new MessageEmbed();
    const { variation } = weightVariation;

    let massString = '';
    if (Math.abs(variation) >= 1) {
      massString = `${Math.trunc(variation)} kg`;
    } else {
      massString = `${Math.floor(variation * 1000)} g`;
    }

    if (weightVariation.variation < 0) {
      embed.setColor('GREEN');
      embed.setDescription(`You lost ${massString}`);
    } else if (weightVariation.variation > 0) {
      embed.setColor('YELLOW');
      embed.setDescription(`You gained ${massString}`);
    } else {
      embed.setColor('BLUE');
      embed.setDescription(
        `No changes still ${weightVariation.currentWeightInKg}`,
      );
    }

    return embed;
  }
}
