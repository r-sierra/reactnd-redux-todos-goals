const logger = (store) => (next) => (action) => {
      console.group(action.type)
      console.log('The action: ', action)

      // Call the next dispatch method in the middleware chain.
      const result = next(action)

      console.log('The new state: ', store.getState())
      console.groupEnd()

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return result
    }

export default logger
