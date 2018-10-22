import { cmark_rules } from  './md-cmark-rules.js';
import { gfm_rules } from './md-gfm-rules.js';
import { ext_rules } from './md-ext-rules.js';

var rules = Object.assign({}, ext_rules, gfm_rules, cmark_rules);

export default rules;
