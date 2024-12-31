import Container from './container.mjs';

class Scope { #s; #c;
	constructor( container ) {
		this.#c = container; }
	has() {
		return this.#c.has( ...arguments ); }
	resolve() {
		return this.#c.resolve( ...arguments ); }
	scope() {
		return new Scope( this.#c.scope( ...arguments ) ); } }

export default class extends Scope {
	constructor() {
		super( new Container( ...arguments ) ); } }
