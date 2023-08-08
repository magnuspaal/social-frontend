'use client'

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
    <div className="sticky top-10 left-0 right-0 ml-auto mr-auto h-20 flex justify-center items-start z-50">
      <TransitionGroup className="flex flex-col items-center">   
      {
        Object.values(alerts).map((alert) => (
          <CSSTransition
            key={alert.index}
            timeout={1000}
            classNames='alert'
          >
            <div key={alert.index} className={`border rounded  p-4 w-fit ${alert.type == AlertType.ERROR ? 'bg-red-400' : 'bg-green-400'}`}>
              <div>{alert.message}</div>
            </div>
          </CSSTransition>
        ))
      }
      </TransitionGroup>
    </div>
  )
}