## LaTeX

```latex
\textbf{\textmd{Unbold piece} within bold context}
```




## Typst

```typst
#text(weight: "bold")[
    #text(weight: "regular")[Unbold piece]
    within bold context
]
```

To unbold on the fly, you must use `#text(weight: "bold")`. You cannot use `*asterisk notation*` or `#strong` command.



## References

- https://typst.app/docs/reference/syntax/
- https://typst.app/docs/reference/text/text/#parameters-weight
