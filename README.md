# warning
this project is unfinished now.

# features
``` tsx
export default function() {
  const className = css `
    font-size: 30px;
    margin: 20px;
    color: red;
    .blue {
      color: blue;
    }
  `
  return (
    <div className={className}>
      this will be red.
      <div className="blue">
      this will be blue.
      </div>
    </div>
  )
}
```
