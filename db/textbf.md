## LaTeX

```
\textbf{Bold Text}
```




## Typst

```
*Bold Text with "strong" semantics*

#strong[Bold Text with explicit strong semantic]

#text(weight: 600)[Bold Text without any semantic implication]

#text(weight: "Bold")[Bold Text without any semantic implication]
```

## Scary Fact

Use `#text(weight: ...)` if you need to unbold a piece of text within the bold context. See [./textmd.html](./textmd.html).


## References

- https://typst.app/docs/reference/syntax/
- https://typst.app/docs/reference/text/text/#parameters-weight
