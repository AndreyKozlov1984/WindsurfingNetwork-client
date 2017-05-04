augroup ft_javascript
    autocmd!
    autocmd BufWritePre * silent! Neoformat prettiereslint
    autocmd Filetype javascript setlocal ts=2 sts=2 sw=2
augroup END

