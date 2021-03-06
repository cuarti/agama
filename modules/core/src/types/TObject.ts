
import {TFunction} from './TFunction';


/**
 * Utility functions for object type
 *
 * TODO: see http://underscorejs.org/#collections
 * TODO: see http://underscorejs.org/#objects
 */
export class TObject {

    /**
     * Type of object
     *
     * @type {string}
     */
    public static readonly TYPE: string = 'object';

    /**
     * Get if value is object
     *
     * @param   {*}         value
     * @return  {boolean}
     */
    public static is(value: any): boolean {
        return typeof value === this.TYPE;
    }

    /**
     * Get keys of object properties
     *
     * @param   {Object}    o
     * @return  {string[]}
     */
    public static keys(o: Object): Array<string> {
        return Object.keys(o);
    }

    /**
     * Get values of object properties
     *
     * @param   {Object}    o
     * @return  {Array}
     */
    public static values<T>(o: Object): Array<T> {

        let values: Array<T> = [];

        this.forEach<T>(o, v => values.push(v));

        return values;
    }

    /**
     * Get size of object
     *
     * @param   {Object}    o
     * @return  {number}
     */
    public static size(o: Object): number {
        return this.keys(o).length;
    }

    /**
     * Iterate object
     *
     * @param {Object}      o
     * @param {Function}    cb
     * @param {Object}      [thisArg]
     */
    public static forEach<T>(o: Object, cb: (v: T, k: string, o: Object) => void, thisArg: Object = o): void {

        for(let i in o) {
            if(o.hasOwnProperty(i)) {
                TFunction.call(cb, thisArg, o[i], i, o);
            }
        }
    }

    /**
     * Iterate object and return new one
     *
     * @param   {Object}    o
     * @param   {Function}  cb
     * @param   {Object}    [thisArg]
     * @return  {Object}
     */
    public static map<T, N>(o: Object, cb: (v: T, k: string, o: Object) => N, thisArg: Object = o): Object {

        let m = {};

        for(let k in o) {
            if(o.hasOwnProperty(k)) {
                m[k] = TFunction.call(cb, thisArg, o[k], k, o);
            }
        }

        return m;
    }

    /**
     * Iterate object and return new one filtered
     *
     * @param   {Object}    o
     * @param   {Function}  cb
     * @param   {Object}    [thisArg]
     * @return  {Object}
     */
    public static filter<T>(o: Object, cb: (v: T, k: string, o: Object) => boolean, thisArg: Object = o): Object {

        let n = {};

        for(let k in o) {
            if(o.hasOwnProperty(k) && TFunction.call(cb, thisArg, o[k], k, o)) {
                n[k] = o[k];
            }
        }

        return n;
    }

    /**
     * Iterate object and reduce it
     *
     * @param   {Object}    o
     * @param   {Function}  cb
     * @param   {*}         r
     * @param   {Object}    [thisArg]
     * @return  {*}
     */
    public static reduce<T, R>(o: Object, cb: (r: R, v: T, k: string, o: Object) => R, r: R, thisArg: Object = o): R {

        for(let k in o) {
            if(o.hasOwnProperty(k)) {
                r = <R> TFunction.call(cb, thisArg, r, o[k], k, o);
            }
        }

        return r;
    }

    /**
     * Iterate object and return if all properties meet condition
     *
     * @param   {Object}    o
     * @param   {Function}  cb
     * @param   {Object}    [thisArg]
     * @return  {boolean}
     */
    public static every<T>(o: Object, cb: (v: T, k: string, o: Object) => boolean, thisArg: Object = o): boolean {

        for(let k in o) {
            if(o.hasOwnProperty(k) && !TFunction.call(cb, thisArg, o[k], k, o)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Iterate object and return if some property meet condition
     *
     * @param   {Object}    o
     * @param   {Function}  cb
     * @param   {Object}    [thisArg]
     * @return  {boolean}
     */
    public static some<T>(o: Object, cb: (v: T, k: string, o: Object) => boolean, thisArg: Object = o): boolean {

        for(let k in o) {
            if(o.hasOwnProperty(k) && TFunction.call(cb, thisArg, o[k], k, o)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if object has keys
     *
     * @param   {Object}    o
     * @param   {string[]}  keys
     * @return  {boolean}
     */
    public static hasKeys(o: Object, keys: Array<string>) {
        return keys.every(k => k in o);
    }

    /**
     * Extract object with explicit keys
     *
     * @param   {Object}    o
     * @param   {string[]}  keys
     * @return  {Object}
     */
    public static extract(o: Object, keys: Array<string>) {
        return this.filter(o, (v, k) => keys.indexOf(k) >= 0);
    }

    // /**
    //  * Extend an object with new properties
    //  *
    //  * @param {T} obj1
    //  * @param {Object} obj2
    //  * @returns {T}
    //  */
    // public static extend<T>(obj1: T, obj2: Object): T {
    //
    //     for(var i in obj2) {
    //         if(obj2.hasOwnProperty(i)) {
    //             obj1[i] = obj2[i];
    //         }
    //     }
    //
    //     return obj1;
    // }

}
