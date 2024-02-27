type JsonAttributes = Record<string, string | null | undefined>

export default class Json {
  readonly values: Record<string, string> = {}

  static fromDbResponse(response: any): Json | null {
    if (response === null) {
      return null
    }

    const attributes: JsonAttributes =
      typeof response === 'string' ? JSON.parse(response) : response

    return new Json(attributes)
  }

  static from(values: JsonAttributes): Json {
    return new Json(values)
  }

  private constructor(values: JsonAttributes) {
    this.values = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== null)
    ) as Record<string, string>
  }

  get(key: string): string | undefined {
    return this.values[key]
  }

  getOrFail(key: string): string {
    const value = this.get(key)

    if (value === undefined) {
      throw new Error(`No json found for key "${key}"`)
    }

    return value
  }

  set(key: string, value: string) {
    this.values[key] = value
  }

  toObject(): JsonAttributes {
    return this.values
  }
}
