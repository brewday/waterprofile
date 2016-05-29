import {runEffects} from '@ngrx/effects';

import {SearchEffects} from '../search/search.effects';

export const APP_EFFECTS = runEffects(
  SearchEffects
);
