import { SortedMap } from "immutable-sorted";

let tMap = new Map()

let e = tMap["a"]
console.log(e) // undefined

let map = SortedMap({ '1': 1, '2': 2, 'c': 3 });
map = map.set('a', 1);
console.log(map.size); // SortedMap { a: 1, b: 2, c: 3 }
