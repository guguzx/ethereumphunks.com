import { Pipe, PipeTransform } from '@angular/core';

import { Filters, Sorts } from '@/models/pipes';
import { Punk } from '@/models/graph';

@Pipe({
  standalone: true,
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  transform(value: Punk[], ...args: [Sorts, Filters]): Punk[] {

    // console.log('sort pipe', {value, args});

    if (!value?.length) return [];
    if (!args?.length) return value;

    let sorted = [ ...value ];

    if (args[0] === 'price-low') {
      if (args[1] === 'listings') sorted = value.sort((a: Punk, b: Punk) => Number(a.listing?.value || '0') - Number(b.listing?.value || '0'));
      if (args[1] === 'bids') sorted = value.sort((a: Punk, b: Punk) => Number(a.bid?.value || '0') - Number(b.bid?.value || '0'));
    }

    if (args[0] === 'price-high') {
      if (args[1] === 'listings') sorted = value.sort((a: Punk, b: Punk) => Number(b.listing?.value || '0') - Number(a.listing?.value || '0'));
      if (args[1] === 'bids') sorted = value.sort((a: Punk, b: Punk) => Number(b.bid?.value || '0') - Number(a.bid?.value || '0'));
    }

    if (args[0] === 'recent') {
      // console.log(args)
      if (args[1] === 'listings') sorted = value.sort((a: Punk, b: Punk) => Number(b.listing?.blockTimestamp || '0') - Number(a.listing?.blockTimestamp || '0'));
      if (args[1] === 'bids') sorted = value.sort((a: Punk, b: Punk) => Number(b.bid?.blockTimestamp || '0') - Number(a.bid?.blockTimestamp || '0'));
    }

    if (args[0] === 'id') {
      sorted = value.sort((a: Punk, b: Punk) => Number(a.id) - Number(b.id));
    }

    return sorted;
  }
}