import { ChangeEvent, ComponentProps } from 'react'
import { Select } from './styles'

type SelectProps = ComponentProps<typeof Select> & {
  name: string
  type: 'city' | 'state'
  options?: {
    sigla?: string
    id?: number
    code?: string
    name?: string
  }[]
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function PlaceSelect({
  name,
  options,
  onSelectChange,
  type,
}: SelectProps) {
  return (
    <Select name={name} id={name} onChange={onSelectChange}>
      {type === 'city'
        ? options?.map((option) => {
            return (
              <option key={option.code} value={option.name}>
                {option.name}
              </option>
            )
          })
        : options?.map((option) => {
            return (
              <option key={option.id} value={option.sigla}>
                {option.sigla}
              </option>
            )
          })}
    </Select>
  )
}
