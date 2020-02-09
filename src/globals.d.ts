import $$ from './i18n'

type $1 = typeof $$
declare global {
  declare const $i: $1
  declare interface Window {
    $i: $1
  }
}
