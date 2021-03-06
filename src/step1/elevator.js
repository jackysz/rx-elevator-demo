import { interval, fromEvent, concat } from 'rxjs'
import { map, take, switchMap } from 'rxjs/operators'

export default function Elevator (emitter, type) {
  return fromEvent(emitter, type).pipe(
    switchMap(({ target }) => {
      const up = interval(1000).pipe(
        map(x => x + 1),
        take(target)
      )
      const down = interval(1000).pipe(
        map(x => target - x),
        take(target)
      )
      return concat(up, down)
    })
  )
}
