import React from 'react'
import { TYPE_COLORS } from './TYPE_COLOURS'
import {MovesComponentProps} from './types'

export default function MovesComponent({
  moves,
  handleAttack,
  attackerId,
  defenderId
}: MovesComponentProps) {
  if (!moves || moves.length === 0) return null

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Power</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {moves.map(move => (
          <tr key={move.id}>
            <td>
              {handleAttack ? (
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleAttack(move.id, attackerId, defenderId)}
                >
                  {move.name}
                </button>
              ) : (
                move.name
              )}
            </td>
            <td>{move.damage}</td>
            <td>
              <span
                className="type-badge"
                style={{ backgroundColor: TYPE_COLORS[move.type as keyof typeof TYPE_COLORS] || '#999' }}
              >
                {move.type}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}