

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlertType, addTimeout, removeAlert} from "@/store/alert-slice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect } from "react";

export default function AlertModal() {

  const alerts = useAppSelector((state) => state.alert.alerts);
  const timeout = useAppSelector((state) => state.alert.timeout)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (timeout) clearTimeout(timeout)
    dispatch(addTimeout(setTimeout(() => dispatch(removeAlert()), 5000)))
  }, [alerts])

  return (
    <div className="sticky max-sm:fixed left-0 right-0 top-0 ml-auto mr-auto h-20 flex justify-center items-center z-50 pointer-events-none">
      <TransitionGroup className="flex flex-col items-center justify-end">   
      {
        Object.values(alerts).map((alert) => (
          <CSSTransition
            key={alert.index}
            timeout={1000}
            classNames='alert'
          >
            <div key={alert.index} className={`rounded p-4 w-fit ${alert.type == AlertType.ERROR ? 'bg-red-400' : 'bg-green-400'}`}>
              <div>{alert.message}</div>
            </div>
          </CSSTransition>
        ))
      }
      </TransitionGroup>
    </div>
  )
}