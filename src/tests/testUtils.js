/**
 *
 * @param {ShallowWrapper} wrapper - Enzyme shallow wwrapper
 * @param {string} val - value of node attr
 * @returns {ShallowWrapper} - An enzyme shallowwrapper
 */
export const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
