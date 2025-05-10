export namespace Validations {
  export interface RuleData {
    fieldName: string
    rules?: Record<string, Validations.Rule | undefined>
    customRules?: Record<string, unknown | undefined>
  }

  export interface Rule {
    name?: string
    value?: string | number | boolean
    customMessage?: string
    validator?: (value: unknown) => boolean
    extraParam?: unknown
  }

  export interface Validation<T> {
    state: () => T
    rules: (value?: boolean) => Validations.RuleData[]
  }

  export interface Model {
    // auth: Validation<User.LoginData>
  }
}
