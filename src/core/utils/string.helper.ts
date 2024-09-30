export class StringHelper {
  /**
   * @description Replaces every place holder [[placeholder]] with the actual value
   * @param {string} template, This is the actual HTML template from the outside world.
   * @param {any{}} values, This is the shape of the user's information.
   * @returns {string} The user's specific HTML template stripped  off of any [[value]]
   */
  static generatePersonalizedHtmlFromTemplateAndValues(
    template: string,
    values: any,
  ) {
    return template.replace(/\[\[(\w+)]]/g, (match, placeHolder) => {
      return values[placeHolder] || match;
    });
  }

  /**
   * @description Transforms an array into an object containing given fields and values
   * @example columns [name, description], info [David, "king"] becomes { name: "David", description: "King" }
   * @param {Record<any, number>}info
   * @param {string[] }columns
   * @returns {Record<unknown, unknown>} object
   */
  static generateObjectFromColumnsAndInfo({
    info,
    columns,
  }: {
    info: Record<any, number>;
    columns: string[];
  }) {
    let object: any = {};
    columns.forEach((column: any, index: number) => {
      object[column] = info[index];
    });

    return object;
  }
}
