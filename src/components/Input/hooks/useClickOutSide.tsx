import { ReactNode, RefObject, useEffect } from "react";

function useClickOutSide (ref: RefObject<HTMLElement>, handler: Function) {

    useEffect( () => {
        const listener = (e: MouseEvent) => {
            if( !ref.current || ref.current.contains(e.target as HTMLElement)){
                return
            }
            handler(e)
        }

        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click',listener)
        }
    },[ref, handler])
}

export default useClickOutSide